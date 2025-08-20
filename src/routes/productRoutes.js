import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET one product
router.get("/:id", getProductById);

// UPDATE product
router.put("/:id", verifyAccessToken, updateProduct);

export default router;
