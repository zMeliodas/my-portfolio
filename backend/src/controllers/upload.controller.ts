import type { Request, Response } from "express";
import {
  getResumeService,
  uploadPdfService,
} from "../services/upload.service.js";
import { uploadProjectImageService } from "../services/upload.service.js";

const uploadPdfController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required.",
      });
    }

    const resume = await uploadPdfService(req.file);

    return res.status(200).json({
      message: "Resume uploaded successfully.",
      result: resume,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to upload resume.",
    });
  }
};

const getResumeController = async (_req: Request, res: Response) => {
  try {
    const resume = await getResumeService();

    if (!resume) {
      return res.status(404).json({
        message: "Resume file not found. Please upload a new PDF.",
      });
    }

    return res.status(200).json({
      message: "Resume fetched successfully.",
      result: {
        originalName: resume.original_name,
        url: "/uploads/pdfs/resume.pdf",
        updatedAt: resume.updated_at,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch resume.",
    });
  }
};

const uploadProjectImageController = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Project image is required.",
    });
  }

  const image = uploadProjectImageService(req.file);

  return res.status(200).json({
    message: "Project image uploaded successfully.",
    result: image,
  });
};

export {
  uploadPdfController,
  uploadProjectImageController,
  getResumeController,
};
