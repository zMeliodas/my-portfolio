import { Router } from "express";
import {
  getCurrentAdminController,
  loginAdminController,
  logoutAdminController,
} from "../controllers/admin.controller.js";
import { authorizeAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", loginAdminController);

router.get("/me", authorizeAdmin, getCurrentAdminController);

router.post("/logout", logoutAdminController);

export default router;