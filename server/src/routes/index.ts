import express from "express";
import userRouter from "./user.routes";
import chatRouter from "./chat.routes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/chat", chatRouter);


export default router;