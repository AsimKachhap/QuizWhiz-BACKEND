import { Request, Response } from "express";
import { User } from "../models/User.models";

//REGISTER
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User Saved Successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went Wrong on the Server",
      error: error,
    });
  }
};

//LOGIN
export const loginUser = (req: Request, res: Response) => {};
