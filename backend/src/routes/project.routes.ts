import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
  updateProjectController,
} from "../controllers/project.controller.js";
import { uploadProjectImage } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", getProjectsController);

router.post("/", uploadProjectImage.single("image"), createProjectController);

router.patch(
  "/:id",
  uploadProjectImage.single("image"),
  updateProjectController,
);

router.delete("/:id", deleteProjectController);

export default router;
