import type { Request, Response } from "express";
import { uploadPdfService } from "../services/upload.service.js";
import { uploadProjectImageService } from "../services/upload.service.js";

const uploadPdfController = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      message: "PDF file is required.",
    });
  }

  const pdf = uploadPdfService(req.file);

  return res.status(201).json({
    message: "PDF uploaded successfully.",
    result: pdf,
  });
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


export { uploadPdfController, uploadProjectImageController };
