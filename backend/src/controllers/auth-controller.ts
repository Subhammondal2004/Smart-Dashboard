import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user-model.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const cookieOptions: any = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

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

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id, user.role);

  user.refreshTokens = [...user.refreshTokens, refreshToken];
  await user.save();

  // set access token as short-lived httpOnly cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  // refresh token cookie (longer)
  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.status(201).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
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

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id, user.role);

  user.refreshTokens = [...user.refreshTokens, refreshToken];
  await user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
  });

  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

export const refreshToken = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as any;

    const user = await User.findById(decoded.id);

    if (!user || !user.refreshTokens.includes(token)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const accessToken = generateAccessToken(user.id, user.role);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error: any) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

export const logout = async (
  req: Request,
  res: Response
) => {
  const token = req.cookies?.refreshToken;

  if (token) {
    try {
      const decoded: any = await import("jsonwebtoken").then((j) =>
        j.verify(token, process.env.JWT_REFRESH_SECRET as string)
      );

      const user = await User.findById(decoded.id);

      if (user) {
        user.refreshTokens = user.refreshTokens.filter((t: string) => t !== token);
        await user.save();
      }
    } catch (err) {
      // ignore
    }
  }

  // clear cookies
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  res.json({ success: true, message: "Logged out" });
};