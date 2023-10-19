import express, { Router } from "express";
import { dashboard } from "../../controllers/dashboard/dashboard";

const router: Router = express.Router();

router.get("/", dashboard);

export default router;
