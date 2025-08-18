import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Test route profile
router.get("/profile", verifyAccessToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
