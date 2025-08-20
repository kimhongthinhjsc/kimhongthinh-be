// routes/introduce.js
import express from "express";
import Introduce from "../models/Introduce.js";

const router = express.Router();

// GET /api/introduce
router.get("/", async (req, res) => {
  try {
    const introduceData = await Introduce.findOne(); // lấy 1 bản ghi duy nhất
    if (!introduceData) {
      return res.status(404).json({ message: "No introduce data found" });
    }
    res.json(introduceData);
  } catch (err) {
    console.error("Error fetching introduce data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/introduce
router.put("/", async (req, res) => {
  try {
    // Lấy dữ liệu cập nhật từ body
    const updateData = req.body;

    // Tìm 1 bản ghi duy nhất
    let introduceData = await Introduce.findOne();
    if (!introduceData) {
      // Nếu chưa có, tạo mới
      introduceData = new Introduce(updateData);
    } else {
      // Cập nhật các trường
      Object.assign(introduceData, updateData);
    }

    // Lưu lại
    const savedData = await introduceData.save();
    res.json(savedData);
  } catch (err) {
    console.error("Error updating introduce data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
