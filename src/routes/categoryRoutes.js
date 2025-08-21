import express from "express";
import {
  getCategories,
  getSubcategoriesByCategory,
  getAllSubcategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id/subcategories", getSubcategoriesByCategory);
router.get("/_all/subcategories", getAllSubcategories);

// CRUD category
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
