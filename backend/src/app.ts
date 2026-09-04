import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes.js";
import pool from "./db/db.js";
import projectRoutes from "./routes/project.routes.js";
import technologyRoutes from "./routes/technology.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

app.get("/api/health/database", async (_req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      message: "Database connected successfully.",
    });
  } catch {
    res.status(500).json({
      message: "Database connection failed.",
    });
  }
});

app.use("/uploads", express.static("uploads"));
app.use("/api/uploads", uploadRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/admin", adminRoutes);

export default app;
