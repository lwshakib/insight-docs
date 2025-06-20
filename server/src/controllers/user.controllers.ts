import { NextFunction, Request, Response } from "express";
import prisma from "../db";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { clerkId, firstName, lastName } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists",
        user: existingUser,
      });
    }
    const user = await prisma.user.create({
      data: {
        clerkId,
        firstName,
        lastName,
        ipAddress: req.ip,
      },
    });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};


export const getMyDetails = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: req.user.clerkId,
      },
    });
    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};