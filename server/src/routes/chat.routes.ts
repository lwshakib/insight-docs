import express from "express";
import { verifyUser } from "../middlewares/auth.middlewares";
import { changeChatTitle, createChat, createNote, deleteChat, deleteDocument, deleteNote, getChatById, getChats, payForCredits, sendMessage, uploadFile } from "../controllers/chat.controllers";
import { upload } from "../middlewares/multer.middlewares";

const chatRouter = express.Router();

    
chatRouter.get("/", verifyUser as any, getChats as any);
chatRouter.post("/", verifyUser as any, createChat as any);
chatRouter.get("/:chatId", verifyUser as any, getChatById as any);
chatRouter.delete("/:chatId", verifyUser as any, deleteChat as any);
chatRouter.put("/:chatId/update/title", verifyUser as any, changeChatTitle as any);

chatRouter.post("/:chatId/upload/file", verifyUser as any, upload.single("file") as any, uploadFile as any);
chatRouter.delete("/:chatId/delete/file/:documentId", verifyUser as any, deleteDocument as any);
chatRouter.post("/:chatId/create/note", verifyUser as any, createNote as any);
chatRouter.delete("/:chatId/delete/note/:noteId", verifyUser as any, deleteNote as any);

chatRouter.post("/:chatId/send/message", verifyUser as any, sendMessage as any);
chatRouter.post("/pay/credits", verifyUser as any, payForCredits as any);

export default chatRouter;