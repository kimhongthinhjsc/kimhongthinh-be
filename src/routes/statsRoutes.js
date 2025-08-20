import express from "express";
import { getVisitStats } from "../controllers/statsController.js";

const router = express.Router();

// GET /api/stats/visits
router.get("/visits", getVisitStats);

export default router;
