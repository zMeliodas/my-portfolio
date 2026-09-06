import { Router } from "express";

import {
  createTechnologyController,
  deleteTechnologyController,
  getTechnologiesController,
  updateTechnologyController,
} from "../controllers/technology.controller.js";
import { authorizeAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getTechnologiesController);
router.post("/", authorizeAdmin, createTechnologyController);
router.patch("/:id", authorizeAdmin, updateTechnologyController);
router.delete("/:id", authorizeAdmin, deleteTechnologyController);

export default router;
