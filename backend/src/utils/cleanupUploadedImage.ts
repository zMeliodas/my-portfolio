import type { Request } from "express";
import { deleteProjectImageService } from "../services/upload.service.js";

const cleanupUploadedImage = async (req: Request) => {
  if (!req.file) return;

  try {
    await deleteProjectImageService(
      `/uploads/projects/${req.file.filename}`,
    );
  } catch (error) {
    console.error(
      "Failed to clean up uploaded project image:",
      error,
    );
  }
};

export { cleanupUploadedImage };