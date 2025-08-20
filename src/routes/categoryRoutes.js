import express from "express";
import {
  getCategories,
  getSubcategoriesByCategory,
  getAllSubcategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id/subcategories", getSubcategoriesByCategory);
router.get("/_all/subcategories", getAllSubcategories);

export default router;
