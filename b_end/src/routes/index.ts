import { Router } from "express";
import authRoutes from "./auth/auth";
import dashboardRoutes from "./dashboard/dashboard";
import lawyerRoutes from "./dashboard/lawyer";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Use the route files here
router.use("/", authRoutes);
router.use("/dashboard", authMiddleware, dashboardRoutes);
router.use("/", authMiddleware, lawyerRoutes);

export default router;
