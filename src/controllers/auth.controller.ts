import { Request, Response } from "express";
import {
  comparePassword,
  generateSessionToken,
  getSessionExpiry,
  hashPassword,
} from "../helpers/auth";
import { getUserByEmail, createUser } from "../services/userService";
import { createSession, deleteSession } from "../services/sessionService";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = res.locals.payload;
    if (!email || !password || !username)
      return res
        .status(400)
        .json({ message: "username, email ,password are required" });

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await createUser(username, email, hashedPassword);

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("Registration error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = res.locals.payload;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //generate seesion token(using uuid)
    const token = generateSessionToken();
    const expiresAt = getSessionExpiry();

    await createSession(user.id, token, expiresAt);

    //HTTP-only cookie
    res.cookie("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Logn error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.session_token;

    if (!token) {
      res.clearCookie("session_token");
      return res.status(200).json({ message: "Logged out" });
    }
    await deleteSession(token);
    res.clearCookie("session_token");
    return res.status(200).json({ message: "Lougout successfully" });
  } catch (error) {
    console.error("Logout error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
