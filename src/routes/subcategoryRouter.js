import express from "express";
import {
  getSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategoryController.js";

const router = express.Router();

// Danh sách + search
router.get("/", getSubcategories);

// Lấy 1 subcategory
router.get("/:id", getSubcategoryById);

// Thêm mới
router.post("/", createSubcategory);

// Cập nhật
router.put("/:id", updateSubcategory);

// Xoá
router.delete("/:id", deleteSubcategory);

export default router;
