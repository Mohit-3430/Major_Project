import express, { Router } from "express";
import { FetchLawyers } from "../../controllers";

const router: Router = express.Router();

router.get("/fetch-lawyers", FetchLawyers);

export default router;
