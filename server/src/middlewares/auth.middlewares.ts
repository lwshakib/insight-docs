import { NextFunction, Response } from "express";
import prisma from "../db";

export const verifyUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const clerkId = req.headers.authorization?.split(" ")[1];
  console.log("clerkId", clerkId);
  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkId,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  next();
};
