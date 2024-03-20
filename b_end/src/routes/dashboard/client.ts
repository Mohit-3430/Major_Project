import express, { Router } from "express";
import { FetchLawyers, CreateCase } from "../../controllers";

const router: Router = express.Router();

router.get("/fetch-lawyers", FetchLawyers);
router.post("/create-case", CreateCase);

export default router;
