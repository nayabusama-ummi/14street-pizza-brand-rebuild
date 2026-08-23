import { Router } from "express";
import { healthController } from "../controllers/healthController";

const router = Router();

router.get("/health", healthController.getHealth.bind(healthController));

export default router;
