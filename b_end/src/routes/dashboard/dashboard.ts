import express, { Router } from "express";
import { dashboardTest } from "../../controllers/dashboard/dashboard";

const router: Router = express.Router();

router.get("/dashboard-home", dashboardTest);

export default router;
