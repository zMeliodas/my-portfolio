import { Router } from "express";
import { uploadPdfController } from "../controllers/upload.controller.js";
import { uploadPdf, uploadProjectImage } from "../middleware/upload.middleware.js";
import { uploadProjectImageController } from "../controllers/upload.controller.js";

const router = Router();

router.post("/pdf", uploadPdf.single("pdf"), uploadPdfController);

router.post(
  "/project-image",
  uploadProjectImage.single("image"),
  uploadProjectImageController,
);

export default router;
