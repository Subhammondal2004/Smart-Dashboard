import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user-model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (
  req: Request,
  res: Response
) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  const token = generateToken(user.id, user.role);

  res.status(201).json({
    success: true,
    token,
    user
  });
};

export const login = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const token = generateToken(user.id, user.role);

  res.json({
    success: true,
    token,
    user
  });
};