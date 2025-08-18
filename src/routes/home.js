import express from "express";
import Home from "../models/Home.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET Home data
router.get("/", async (req, res) => {
  try {
    const home = await Home.findOne(); // chỉ có 1 document
    res.json(home);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE Home data
router.put("/", verifyAccessToken, async (req, res) => {
  try {
    const home = await Home.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true } // nếu chưa có thì tạo mới
    );
    res.json(home);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
