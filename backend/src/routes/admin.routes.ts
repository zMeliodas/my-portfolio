import { Router } from "express";

import { loginAdminController } from "../controllers/admin.controller.js";

const router = Router();

router.post("/login", loginAdminController);

export default router;