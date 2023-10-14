import { Router } from "express";
import authRoutes from "./auth/auth";

const router = Router();

// Use the route files here
router.use("/", authRoutes);

export default router;
