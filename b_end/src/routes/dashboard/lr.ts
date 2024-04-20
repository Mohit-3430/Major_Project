import express, { Router } from "express";
import { LRClassification, Summarization } from "../../controllers/";

const router: Router = express.Router();

router.post("/classification", LRClassification);
router.post("/summarization", Summarization);

export default router;
