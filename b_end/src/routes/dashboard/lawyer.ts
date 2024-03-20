import express, { Router } from "express";
import { LawyerDashboardData, GetClientInformation } from "../../controllers";

const router: Router = express.Router();

router.post("/lawyer-dashboard-data", LawyerDashboardData);
router.post("/get-client-info", GetClientInformation);

export default router;
