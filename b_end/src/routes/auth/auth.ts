import express, { Router, Request, Response } from "express";
import { check, loginHandler, registerHandler } from "../../controllers";

const router: Router = express.Router();

router.get("/auth", check);
router.post("/login", loginHandler);
router.post("/register", registerHandler);

export default router;
