"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import {
  Bookmark,
  FileText,
  GalleryHorizontalEnd,
  Loader2,
  Send,
  Trash,
  Upload,
} from "lucide-react";

import { CreditScoreButton } from "@/components/credit-score-button";
import SingleChatLoadingPage from "@/components/single-chat-loading-page";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export const AddSourceDrawer = () => {
  const { user } = useUser();
  const { fileUploading, setFileUploading, chatDocuments, setChatDocuments } =
    useGlobalContext();
  const params = useParams();
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setFileUploading(acceptedFiles[0]);
      console.log(acceptedFiles[0]);

      toast.info(`Uploading ${acceptedFiles[0].name}...`);

      const closeButton = document.querySelector(
        ".close-the-drawer"
      ) as HTMLElement;
      closeButton?.click();

      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      console.log(user?.id);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${params.id}/upload/file`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${user?.id}`,
          },
        }
      );
      const data = await response.json();
      if(data.success){
        setChatDocuments([data.file, ...chatDocuments]);
        setFileUploading(null);
        toast.success(`${acceptedFiles[0].name} uploaded successfully`);
      } else {
        toast.error(data.message);
        setFileUploading(null);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
      setFileUploading(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          <span className="text-sm text-foreground">
            Sources let InsightDoc base its responses on the information that
            matters most to you.
          </span>
          <br />
          <span className="text-sm text-muted-foreground">
            (Examples: marketing plans, course reading, research notes, meeting
            transcripts, sales documents, etc.)
          </span>
        </DrawerTitle>
      </DrawerHeader>
      <div className="flex flex-col gap-4 px-4 pb-4 h-full">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`flex flex-col h-full items-center justify-center border-2 border-dashed rounded-md p-6 transition-colors cursor-pointer ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-border bg-background/50 hover:bg-background/80"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 mb-2 text-primary" />
          <p className="text-sm text-zinc-300">
            {isDragActive
              ? "Drop the files here ..."
              : "Drag & drop files here, or click to select"}
          </p>
        </div>
      </div>
      <DrawerClose className="close-the-drawer" />
    </DrawerContent>
  );
};

export const SourceUI = ({
  handleSourceShrink,
}: {
  handleSourceShrink?: () => void;
}) => {
  const params = useParams();
  const { selectedSources, setSelectedSources } = useGlobalContext();
  const { user } = useUser();
  const {
    chatDocuments: documents,
    setChatDocuments,
    fileUploading,
  } = useGlobalContext();
  const isSelected = (source: any) =>
    selectedSources.some((s) => s.id === source.id);

  // Select/Deselect all logic
  const handleSelectAllSources = () => {
    if (selectedSources.length === documents.length) {
      setSelectedSources([]);
      toast.success("All sources deselected");
    } else {
      setSelectedSources([...documents]);
      toast.success("All sources selected");
    }
  };

  // Toggle individual source selection
  const handleSelectSource = (source: any) => {
    if (isSelected(source)) {
      setSelectedSources(selectedSources.filter((s) => s.id !== source.id));
      toast.success(`${source.fileName} deselected`);
    } else {
      setSelectedSources([...selectedSources, source]);
      toast.success(`${source.fileName} selected`);
    }
  };

  const handleDeleteSource = async (sourceId: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${params.id}/delete/file/${sourceId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.id}`,
        },
      }
    );
    const data = await response.json();
    setChatDocuments(documents.filter((doc: any) => doc.id !== sourceId));
    setSelectedSources(selectedSources.filter((s) => s.id !== sourceId));
    toast.success(
      `${
        documents.find((doc: any) => doc.id === sourceId)?.fileName
      } deleted successfully`
    );
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="font-medium text-sm text-foreground">Sources</span>
        <div className="flex gap-2">
          <Drawer>
            <DrawerTrigger>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-md px-3 py-1.5 text-xs font-medium"
              >
                + Add
              </Button>
            </DrawerTrigger>
            <AddSourceDrawer />
          </Drawer>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-md px-3 py-1.5 text-xs font-medium"
          >
            Discover
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer lg:block hidden"
            onClick={handleSourceShrink}
          >
            <GalleryHorizontalEnd className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center px-4 py-2 border-b border-border">
        <Checkbox
          id="select-all-sources-lg"
          checked={
            selectedSources.length === documents.length && documents.length > 0
          }
          onCheckedChange={handleSelectAllSources}
          className="mr-2"
        />
        <label
          htmlFor="select-all-sources-lg"
          className="text-xs text-zinc-400 select-none cursor-pointer"
        >
          Select all sources
        </label>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {fileUploading && (
          <div className="flex items-center bg-card rounded-md px-2 py-2 mb-2">
            <Button variant="ghost" size="icon" className="mr-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
            </Button>
            <span className="flex-1 text-sm text-foreground">
              {fileUploading.name}
            </span>
            <Button variant="ghost" size="icon" className="mr-2">
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            </Button>
          </div>
        )}
        {documents.map((source) => (
          <div
            key={source.id}
            className="flex items-center bg-card rounded-md px-2 py-2 mb-2"
          >
            <Button variant="ghost" size="icon" className="mr-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
            </Button>
            <span className="flex-1 text-sm text-foreground">
              {source.fileName}
            </span>
            <Checkbox
              className="ml-2"
              checked={isSelected(source)}
              onCheckedChange={() => handleSelectSource(source)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => handleDeleteSource(source.id)}
            >
              <Trash className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export const ChatUI = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();
  const {
    chatDocuments,
    selectedSources,
    chatMessages,
    setChatMessages,
    chatNotes,
    setChatNotes,
    setChat,
    chat,
  } = useGlobalContext();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loading]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setError(null);
    setLoading(true);
    const userMsg = {
      sender: "USER",
      message: message,
      createdAt: new Date().toISOString(),
    };
    setChatMessages([...chatMessages, userMsg]);
    setMessage("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${params.id}/send/message`,
        {
          message,
          sources: selectedSources,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.id}`,
          },
        }
      );
      const assistantMsg = {
        sender: "ASSISTANT",
        message:
          response.data.answer?.message ||
          response.data.answer ||
          "(No response)",
        createdAt: new Date().toISOString(),
      };
      setChatMessages([...chatMessages, userMsg, assistantMsg]);
      setChat({
        ...chat,
        user: { ...chat.user, credits: response.data.credits },
      });
    } catch (err: any) {
      if (err.response.data.status === "INSUFFICIENT_CREDITS") {
        toast.error("Insufficient credits", {
          action: {
            label: "Buy Credits",
            onClick: () => {
              router.push("/pricing");
            },
          },
        });
      }
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveToNote = async (messageContent: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${params.id}/create/note`,
      {
        content: messageContent,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.id}`,
        },
      }
    );
    setChatNotes([response.data.note, ...chatNotes]);
    toast.success(`Note created successfully: ${response.data.note.title}`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-8 pt-8 pb-4 h-[calc(100dvh-160px-2rem)]">
        <div
          className="w-full flex-1 overflow-y-auto flex flex-col gap-2 bg-background/80 rounded-md p-4 border border-border chat-scrollbar"
          style={{ minHeight: 300 }}
        >
          {chatMessages.map((msg, index) => (
            <>
              <div
                key={index}
                className={`flex ${
                  msg.sender === "USER" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] flex flex-col ${
                    msg.sender === "USER"
                      ? "bg-primary text-primary-foreground rounded-br-md rounded-tl-md rounded-bl-md ml-auto"
                      : "bg-muted text-foreground rounded-bl-md rounded-tr-md rounded-br-md mr-auto"
                  } p-3 shadow-sm`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {msg.sender === "USER" ? (
                      <span className="text-xs font-semibold">You</span>
                    ) : (
                      <span className="text-xs font-semibold">Assistant</span>
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {formatDistanceToNow(new Date(msg.createdAt))} ago
                    </span>
                  </div>
                  <span className="text-sm whitespace-pre-line">
                    {msg.message}
                  </span>
                </div>
              </div>
              {msg.sender === "ASSISTANT" && (
                <div className="">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => saveToNote(msg.message)}
                  >
                    <Bookmark className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[75%] bg-muted text-foreground rounded-bl-md rounded-tr-md rounded-br-md mr-auto p-3 shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-sm">Assistant is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {error && (
          <div className="w-full max-w-2xl mt-2 text-destructive text-sm text-center bg-destructive/10 rounded p-2 border border-destructive">
            {error}
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-end lg:px-8 px-4 pb-6 w-full h-[100px]">
        <form
          className="flex items-center bg-card rounded-lg px-4 py-3 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) handleSendMessage();
          }}
        >
          <Input
            placeholder="Start typing..."
            className="bg-transparent border-none text-foreground placeholder-muted-foreground focus:ring-0 w-full mr-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={loading}
            autoFocus
          />
          <Button
            variant="default"
            size="icon"
            className="cursor-pointer"
            onClick={handleSendMessage}
            disabled={message.length === 0 || loading}
            type="submit"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export const NotesUI = ({
  handleNotesShrink,
}: {
  handleNotesShrink?: () => void;
}) => {
  const params = useParams();
  const { chatNotes, setChatNotes } = useGlobalContext();
  const { user } = useUser();
  const deleteNote = async (noteId: string) => {
    setChatNotes(chatNotes.filter((note: any) => note.id !== noteId));
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${params.id}/delete/note/${noteId}`,
      {
        headers: {
          Authorization: `Bearer ${user?.id}`,
        },
      }
    );
    toast.success(`Note deleted successfully`);
  };
  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center justify-start p-2 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={handleNotesShrink}
          >
            <GalleryHorizontalEnd className="w-4 h-4 rotate-180" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {chatNotes.length > 0 ? (
            <div className="flex flex-col gap-2">
              {chatNotes.map((note: any) => (
                <div
                  className="bg-card rounded-md px-3 py-2 shadow group hover:bg-muted transition"
                  key={note.id}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground cursor-pointer hover:underline">
                      {note.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(note.createdAt))} ago
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() => deleteNote(note.id)}
                    >
                      <Trash className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="text-sm text-foreground">
                    {note.content.slice(0, 90)}...
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-sm text-muted-foreground">
                No notes found
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default function ChatPage() {
  const params = useParams();
  const [isSourceShrink, setIsSourceShrink] = useState(false);
  const [isNotesShrink, setIsNotesShrink] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const { user, isLoaded } = useUser();
  const { setChatDocuments, setChatMessages, setChatNotes, chat, setChat } =
    useGlobalContext();
  const handleSourceShrink = () => {
    setIsSourceShrink(!isSourceShrink);
  };
  const handleNotesShrink = () => {
    setIsNotesShrink(!isNotesShrink);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
    setEditedTitle(chat.title);
  };

  const handleSaveTitle = async () => {
    console.log("New title:", editedTitle);
    setChat({ ...chat, title: editedTitle });
    setIsEditingTitle(false);
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${params.id}/update/title`,
      {
        title: editedTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.id}`,
        },
      }
    );
    toast.success(`Title updated successfully`);
  };

  const handleCancelEdit = () => {
    setIsEditingTitle(false);
    setEditedTitle("");
  };

  useEffect(() => {
    const fetchChat = async () => {
      const getUserId = await fetch("/api");
      const user = await getUserId.json();
      console.log(user);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.userId}`,
          },
        }
      );
      const data = await response.json();
      setChatDocuments(data.chat.documents);
      setChat(data.chat);
      setChatMessages(data.chat.messages);
      setChatNotes(data.chat.notes);
    };
    fetchChat();
  }, []);
  return (
    <>
      {chat && isLoaded ? (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20 ">
          <header className="flex justify-between items-center p-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-[60px]">
            <div className="flex items-center gap-2">
              {isEditingTitle ? (
                <>
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="text-2xl font-bold bg-transparent border-none p-0 focus:ring-0 focus:border-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveTitle();
                      } else if (e.key === "Escape") {
                        handleCancelEdit();
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSaveTitle}
                    className="text-green-600 hover:text-green-700"
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="text-red-600 hover:text-red-700"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <h1
                  className="text-2xl font-bold cursor-pointer hover:text-primary transition-colors"
                  onClick={handleTitleClick}
                >
                  {chat.title}
                </h1>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <CreditScoreButton score={chat.user.credits} />
              <ModeToggle />
            </div>
          </header>
          <div className="flex-1 p-4">
            <div className="block lg:hidden h-[calc(100dvh-60px-2rem)]">
              <Tabs defaultValue="source" className="h-full flex flex-col">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="source">Source</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="source" className="h-full">
                  <div className="flex flex-col h-full bg-background rounded-md p-0">
                    <SourceUI />
                  </div>
                </TabsContent>
                <TabsContent value="chat" className="h-full">
                  <div className="flex flex-col h-full bg-background rounded-md p-0">
                    <ChatUI />
                  </div>
                </TabsContent>
                <TabsContent value="notes" className="h-full">
                  <div className="flex flex-col h-full rounded-md bg-background">
                    <NotesUI />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <div className="hidden lg:flex flex-row gap-6 h-[calc(100dvh-60px-2rem)]">
              {/* Source Sidebar */}
              <div
                className={`flex flex-col gap-4 ${
                  isSourceShrink
                    ? "flex-[0_0_60px] min-w-[60px]"
                    : "flex-[1_1_300px] min-w-[220px] max-w-[350px]"
                } h-full bg-background rounded-md p-0 transition-all duration-300 border-r border-border sticky top-4`}
                style={{ zIndex: 10 }}
              >
                {isSourceShrink ? (
                  <div className="flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-background cursor-pointer mt-4 hover:bg-zinc-800/80"
                      onClick={handleSourceShrink}
                    >
                      <GalleryHorizontalEnd className="w-4 h-4 rotate-180" />
                    </Button>
                  </div>
                ) : (
                  <SourceUI handleSourceShrink={handleSourceShrink} />
                )}
              </div>
              {/* Chat Area */}
              <div
                className={`flex flex-col gap-4 transition-all duration-300 shadow-lg ${
                  isSourceShrink && isNotesShrink
                    ? "flex-[4_4_0%]"
                    : isSourceShrink || isNotesShrink
                    ? "flex-[3_3_0%]"
                    : "flex-[2_2_0%]"
                } h-full bg-gradient-to-br from-background via-background to-muted/20 rounded-md p-0 border-l border-r border-border`}
                style={{ minWidth: 0 }}
              >
                <ChatUI />
              </div>
              {/* Notes Sidebar */}
              <div
                className={`flex flex-col gap-4 ${
                  isNotesShrink
                    ? "flex-[0_0_60px] min-w-[60px]"
                    : "flex-[1_1_300px] min-w-[220px] max-w-[350px]"
                } h-full bg-background rounded-md p-0 transition-all duration-300 border-l border-border sticky top-4`}
                style={{ zIndex: 10 }}
              >
                {isNotesShrink ? (
                  <div className="flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-background cursor-pointer mt-4 hover:bg-zinc-800/80"
                      onClick={handleNotesShrink}
                    >
                      <GalleryHorizontalEnd className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <NotesUI handleNotesShrink={handleNotesShrink} />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SingleChatLoadingPage />
      )}
    </>
  );
}
