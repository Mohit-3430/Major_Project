import express, { Router } from "express";
import {
  LawyerDashboardData,
  GetClientInformation,
  updateCaseStage,
} from "../../controllers";

const router: Router = express.Router();

router.post("/lawyer-dashboard-data", LawyerDashboardData);
router.post("/get-client-info", GetClientInformation);
router.patch("/update-case-stage", updateCaseStage);

export default router;
