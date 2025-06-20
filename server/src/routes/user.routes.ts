import express from "express";
import { createUser, getMyDetails } from "../controllers/user.controllers";
import { verifyUser } from "../middlewares/auth.middlewares";

const userRouter = express.Router();

userRouter.post("/", createUser as any);
userRouter.get("/me", verifyUser as any, getMyDetails as any);

export default userRouter;
