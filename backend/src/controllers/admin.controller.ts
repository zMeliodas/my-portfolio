import type { Request, Response } from "express";
import { verify } from "@node-rs/argon2";
import { getAdminByUsernameService } from "../services/admin.service.js";
import { generateAdminToken } from "../utils/jwtTokenGenerator.js";

const loginAdminController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (
      typeof username !== "string" ||
      !username.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    const admin = await getAdminByUsernameService(username.trim());

    if (!admin) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const isPasswordValid = await verify(admin.password_hash, password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const token = generateAdminToken(admin.id, admin.username);

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      message: "Login successful.",
      result: {
        admin: {
          id: admin.id,
          username: admin.username,
        },
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to login.",
    });
  }
};

const getCurrentAdminController = (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Admin authenticated.",
    result: {
      admin: req.admin,
    },
  });
};

const logoutAdminController = (req: Request, res: Response) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Logout successful.",
  });
};

export {
  loginAdminController,
  getCurrentAdminController,
  logoutAdminController,
};
