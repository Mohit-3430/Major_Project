import express, { Router } from "express";
import {
  FetchLawyers,
  CreateCase,
  ClientDashboardData,
} from "../../controllers";

const router: Router = express.Router();

router.get("/fetch-lawyers", FetchLawyers);
router.post("/client-dashboard-data", ClientDashboardData);
router.post("/create-case", CreateCase);

export default router;
