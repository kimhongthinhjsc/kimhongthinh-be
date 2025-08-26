import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  updateProduct,
  searchProducts,
  deleteProduct,
  createProduct
} from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// Search products
router.get("/search", searchProducts);

// GET one product
router.get("/:id", getProductById);

// UPDATE product
router.put("/:id", verifyAccessToken, updateProduct);

// DELETE product
router.delete("/:id", verifyAccessToken, deleteProduct);

// CREATE product
router.post("/", verifyAccessToken, createProduct);

export default router;
