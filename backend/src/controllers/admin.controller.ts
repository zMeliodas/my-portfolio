import type { Request, Response } from "express";
import { verify } from "@node-rs/argon2";
import { getAdminByUsernameService } from "../services/admin.service.js";
import { generateAdminToken } from "../utils/jwtTokenGenerator.js";

const loginAdminController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    const admin = await getAdminByUsernameService(
      username.trim(),
    );

    if (!admin) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const passwordMatches = await verify(
      admin.password_hash,
      password,
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const token = generateAdminToken(
      admin.id,
      admin.username,
    );

    return res.status(200).json({
      message: "Login successful.",
      result: {
        token,
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

export { loginAdminController };