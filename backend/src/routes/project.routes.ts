import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
  updateProjectController,
} from "../controllers/project.controller.js";
import { uploadProjectImage } from "../middleware/upload.middleware.js";
import { authorizeAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getProjectsController);

router.post(
  "/",
  authorizeAdmin,
  uploadProjectImage.single("image"),
  createProjectController,
);

router.patch(
  "/:id",
  authorizeAdmin,
  uploadProjectImage.single("image"),
  updateProjectController,
);

router.delete("/:id", authorizeAdmin, deleteProjectController);

export default router;
