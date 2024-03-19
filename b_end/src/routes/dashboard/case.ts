import express, { Router } from "express";
import { CreateCase } from "../../controllers/dashboard/case";

const router: Router = express.Router();

router.post("/create-case", CreateCase);

export default router;
