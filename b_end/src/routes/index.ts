import { Router } from "express";
import authRoutes from "./auth/auth";
import dashboardRoutes from "./dashboard/dashboard";
import lawyerRoutes from "./dashboard/lawyer";
import caseRoutes from "./dashboard/case";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Use the route files here
router.use("/", authRoutes);
router.use("/dashboard", authMiddleware, dashboardRoutes);
router.use("/", authMiddleware, lawyerRoutes);
router.use("/", authMiddleware, caseRoutes);

export default router;
