import { TaskType } from "@google/generative-ai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { TextLoader } from "langchain/document_loaders/fs/text";

import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";

import fs from "fs";
import Stripe from "stripe";
import prisma from "../db";

export const getChats = async (req: any, res: any, next: any) => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        clerkId: req.user.clerkId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      chats,
    });
  } catch (error) {
    next(error);
  }
};

export const createChat = async (req: any, res: any, next: any) => {
  try {
    const newChat = await prisma.chat.create({
      data: {
        clerkId: req.user.clerkId,
        title: "Untitled Chat",
        user: {
          connect: {
            clerkId: req.user.clerkId,
          },
        },
      },
    });
    res.status(201).json({
      success: true,
      message: "Chat created successfully",
      chat: newChat,
    });
  } catch (error) {
    next(error);
  }
};

export const getChatById = async (req: any, res: any, next: any) => {
  const { chatId } = req.params;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        clerkId: req.user.clerkId,
      },
      include: {
        documents: {
          orderBy: {
            createdAt: "desc",
          },
        },
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
        notes: {
          orderBy: {
            createdAt: "desc",
          },
        },
        user: {
          select: {
            credits: true,
          },
        },
      },
    });
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Chat fetched successfully",
      chat,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChat = async (req: any, res: any, next: any) => {
  const { chatId } = req.params;
  try {
    const chat = await prisma.chat.delete({
      where: {
        id: chatId,
        clerkId: req.user.clerkId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
      chat,
    });
  } catch (error) {
    next(error);
  }
};

export const changeChatTitle = async (req: any, res: any, next: any) => {
  const { chatId } = req.params;
  const { title } = req.body;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: chatId,
        clerkId: req.user.clerkId,
      },
      data: {
        title: title,
      },
    });
    res.status(200).json({
      success: true,
      message: "Chat title changed successfully",
      chat,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadFile = async (req: any, res: any, next: any) => {
  const { chatId } = req.params;
  const { file } = req;
  try {
    const newFile = await prisma.document.create({
      data: {
        clerkId: req.user.clerkId,
        fileName: file.originalname,
        content_url: file.path,
        content_type: file.mimetype.split("/")[1].toUpperCase(),
        userId: req.user.id,
        chatId: chatId,
        size: file.size,
      },
    });

    let loader;

    if (file.mimetype === "application/pdf") {
      loader = new PDFLoader(file.path);
    } else if (file.mimetype === "text/plain") {
      loader = new TextLoader(file.path);
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      loader = new DocxLoader(file.path);
    } else if (file.mimetype === "application/msword") {
      loader = new DocxLoader(file.path, {
        type: "doc",
      });
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      loader = new PPTXLoader(file.path);
    } else if (file.mimetype === "text/csv") {
      loader = new CSVLoader(file.path);
    } else {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type",
      });
    }

    if (!loader) {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type",
      });
    }

    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const chunk_of_docs = await textSplitter.splitDocuments(docs);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004", // 768 dimensions
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: newFile.fileName,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRANT_URL,
        collectionName: "pdf_chunks", // Shared collection
      }
    );
    const enrichedDocs = chunk_of_docs.map((doc, index) => {
      doc.metadata = {
        ...doc.metadata,
        clerkId: req.user.clerkId,
        userId: req.user.id,
        chatId: chatId,
        fileId: newFile.id.toString(),
        fileName: newFile.fileName,
        chunkIndex: index,
      };
      return doc;
    });

    await vectorStore.addDocuments(enrichedDocs);

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const deleteDocument = async (req: any, res: any, next: any) => {
  const { documentId } = req.params;
  try {
    const document = await prisma.document.delete({
      where: { id: documentId, clerkId: req.user.clerkId },
    });

    fs.unlinkSync(document.content_url);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
      document,
    });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req: any, res: any, next: any) => {
  const { chatId } = req.params;
  const { content } = req.body;
  try {
    const title = await titleGenerator(content);
    console.log({
      clerkId: req.user.clerkId,
      title: title,
      content: content,
      chatId: chatId,
    });
    const newNote = await prisma.notes.create({
      data: {
        clerkId: req.user.clerkId,
        title: title,
        content: content,
        chatId: chatId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req: any, res: any, next: any) => {
  const { noteId } = req.params;
  try {
    const note = await prisma.notes.delete({
      where: { id: noteId, clerkId: req.user.clerkId },
    });
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req: any, res: any, next: any) => {
  const { chatId } = req.params;
  const { message, sources } = req.body;
  try {
    if (req.user.credits < 500) {
      return res.status(400).json({
        success: false,
        message:
          "You have insufficient credits. Please add credits to continue.",
        status: "INSUFFICIENT_CREDITS",
      });
    }
    const newMessage = await prisma.message.create({
      data: {
        clerkId: req.user.clerkId,
        message: message,
        chatId: chatId,
        userId: req.user.id,
        sender: "USER",
      },
    });

    const fileIds = sources.map((source: any) => source.id);
    const answer = await askQuestion(message, req.user.id, fileIds);

    if (
      answer.usage_metadata?.total_tokens &&
      answer.usage_metadata?.total_tokens > req.user.credits
    ) {
      return res.status(400).json({
        success: false,
        message:
          "You have insufficient credits. Please add credits to continue.",
        status: "INSUFFICIENT_CREDITS",
      });
    }
    const user = await prisma.user.update({
      where: {
        clerkId: req.user.clerkId,
      },
      data: {
        credits: {
          decrement: answer.usage_metadata?.total_tokens,
        },
      },
    });

    const botMessage = await prisma.message.create({
      data: {
        clerkId: req.user.clerkId,
        message: answer.answer.toString(),
        chatId: chatId,
        userId: req.user.id,
        sender: "ASSISTANT",
      },
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      answer: botMessage,
      sources: answer.sources,
      credits: user.credits,
    });
  } catch (error) {
    next(error);
  }
};

export const titleGenerator = async (content: string) => {
  const prompt = PromptTemplate.fromTemplate(`
  You are a title generator. You are given a content and you need to generate a title for it. One Small Title only.
  Content: {content}
  Title:
  `);

  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_API_KEY!,
  });

  const chain = RunnableSequence.from([prompt, llm]);
  const answer = await chain.invoke({ content: content });
  return answer.content.toString();
};

export const askQuestion = async (
  text: string,
  userId: string,
  fileIds: string[]
) => {
  // 1. Initialize embeddings with GoogleGenerativeAIEmbeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004", // 768-dim
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title: "Document title",
    apiKey: process.env.GOOGLE_API_KEY!,
  });

  // 2. Load existing vector store collection from Qdrant
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: process.env.QDRANT_URL!,
      collectionName: "pdf_chunks",
    }
  );

  // 3. Retrieve top relevant chunks filtered by userId and fileIds
  const results = await vectorStore.similaritySearch(text, 3, {
    must: [
      { key: "metadata.userId", match: { value: userId } },
      { key: "metadata.fileId", match: { any: fileIds } },
    ],
  });

  // 4. Extract context text with detailed source info from each chunk
  const sources = results.map((r, index) => {
    const meta = r.metadata;
    return {
      chunkIndex: meta.chunkIndex ?? index + 1,
      content: r.pageContent,
      source: {
        fileId: meta.fileId,
        fileName:
          meta.fileName || meta.source?.split("\\").pop() || "unknown file",
        pageNumber: meta.loc?.pageNumber ?? "unknown page",
        startLine: meta.loc?.lines?.from ?? "unknown",
        endLine: meta.loc?.lines?.to ?? "unknown",
      },
    };
  });

  // Compose context text for the prompt including chunk and source details
  const contextText = sources
    .map(
      (s, i) =>
        `Chunk ${s.chunkIndex} (Page ${s.source.pageNumber}, Lines ${s.source.startLine}-${s.source.endLine} from ${s.source.fileName}):\n${s.content}`
    )
    .join("\n\n");

  // 5. Prepare the prompt template for the LLM
  const prompt = PromptTemplate.fromTemplate(`
    You are a professional and intelligent assistant with the demeanor of an experienced teacher.
    Your primary function is to provide concise, helpful, and accurate answers strictly based on the provided context.
    
    Context:
    {context}
    
    Question:
    {question}
    
    Instructions:
    - If the answer is found in the context:
      - Respond concisely and clearly.
      - Do not include source references.
      - Do not add information that is not directly supported by the context.
    
    - If the answer is *not* in the context, respond with: "I'm sorry, this information is not available in the provided context."
    
    - If the input is a casual message such as "hi", "hello", "hey", or similar greetings, respond warmly with phrases like:
      - "Hello! How can I assist you today?"
      - "Hey there! What’s on your mind?"
      - "Hi! Ready to dive into something?"
    
    - If the input is vague or unclear, politely ask for clarification while encouraging curiosity.
    
    Maintain a respectful, precise, and educational tone. Avoid unnecessary elaboration unless it aids clarity.
    `);
    

  // 6. Initialize the ChatGoogleGenerativeAI model
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_API_KEY!,
  });

  // 7. Create the chain (prompt -> LLM)
  const chain = RunnableSequence.from([prompt, llm]);

  // 8. Run the chain with the context and user question
  const answer = await chain.invoke({
    context: contextText,
    question: text,
  });

  return {
    answer: answer.content,
    usage_metadata: answer.usage_metadata,
    sources: sources.map((s) => ({
      fileId: s.source.fileId,
      fileName: s.source.fileName,
      pageNumber: s.source.pageNumber,
      startLine: s.source.startLine,
      endLine: s.source.endLine,
      chunkContent: s.content,
    })),
  };
};

export const payForCredits = async (req: any, res: any, next: any) => {
  const { sessionId } = req.query;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }
    const addCredits = await prisma.user.update({
      where: {
        clerkId: req.user.clerkId,
      },
      data: {
        credits: {
          increment: 10000,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Credits added successfully",
      credits: addCredits,
    });
  } catch (error) {
    next(error);
  }
};
