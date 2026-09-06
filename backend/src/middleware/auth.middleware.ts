import type { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing.");
}

const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.adminToken;

  if (typeof token !== "string" || !token) {
    return res.status(401).json({
      message: "Unauthorized.",
    });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (
      typeof payload === "string" ||
      typeof payload.adminId !== "number" ||
      typeof payload.username !== "string"
    ) {
      return res.status(401).json({
        message: "Invalid token.",
      });
    }

    req.admin = {
      id: payload.adminId,
      username: payload.username,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export { authorizeAdmin };
