import { Router } from "express";
import { getResumeController, uploadPdfController } from "../controllers/upload.controller.js";
import {
  uploadPdf,
  uploadProjectImage,
} from "../middleware/upload.middleware.js";
import { uploadProjectImageController } from "../controllers/upload.controller.js";
import { authorizeAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/pdf", getResumeController);

router.post(
  "/pdf",
  authorizeAdmin,
  uploadPdf.single("pdf"),
  uploadPdfController,
);

router.post(
  "/project-image",
  authorizeAdmin,
  uploadProjectImage.single("image"),
  uploadProjectImageController,
);

export default router;
