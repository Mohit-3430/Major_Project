import { Router } from "express";
import authRoutes from "./auth/auth";
import dashboardRoutes from "./dashboard/dashboard";
import clientRoutes from "./dashboard/client";
import lawyerRoutes from "./dashboard/lawyer";
import lrRoutes from "./dashboard/lr";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Use the route files here
router.use("/", authRoutes);
router.use("/", authMiddleware, dashboardRoutes);
router.use("/", authMiddleware, clientRoutes);
router.use("/", authMiddleware, lawyerRoutes);
router.use("/", authMiddleware, lrRoutes);

export default router;
