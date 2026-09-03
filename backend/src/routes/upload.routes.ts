import { Router } from "express";
import { uploadPdfController } from "../controllers/upload.controller.js";
import {
  uploadPdf,
  uploadProjectImage,
} from "../middleware/upload.middleware.js";
import { uploadProjectImageController } from "../controllers/upload.controller.js";
import { authorizeAdmin } from "../middleware/auth.middleware.js";

const router = Router();

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
