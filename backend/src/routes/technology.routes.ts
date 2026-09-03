import { Router } from "express";

import {
  createTechnologyController,
  deleteTechnologyController,
  getTechnologiesController,
  updateTechnologyController,
} from "../controllers/technology.controller.js";

const router = Router();

router.get("/", getTechnologiesController);
router.post("/", createTechnologyController);
router.patch("/:id", updateTechnologyController);
router.delete("/:id", deleteTechnologyController);

export default router;