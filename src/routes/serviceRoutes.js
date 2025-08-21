import express from "express";
import Service from "../models/Service.js";
import {
  getServiceById,
  getAllServices,
  searchServices,
  createService,
  updateService,
  deleteService
} from "../controllers/serviceController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tìm kiếm phải đặt trước
router.get("/search", searchServices);

// Lấy tất cả dịch vụ
router.get("/", getAllServices);

// Lấy dịch vụ theo id
router.get("/:id", getServiceById);

router.post("/", verifyAccessToken, createService);
router.put("/:id", verifyAccessToken, updateService);
router.delete("/:id", verifyAccessToken, deleteService);

export default router;
