import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.routes.js";
import pool from "./db/db.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

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

export default app;
