import express, { Router } from "express";
import { LawyerDashboardData } from "../../controllers";

const router: Router = express.Router();

router.get("/dashboard-data-lawyer", LawyerDashboardData);

export default router;
