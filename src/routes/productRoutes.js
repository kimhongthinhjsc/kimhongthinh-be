import express from "express";
import Product from "../models/Product.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";


const router = express.Router();

// GET all products with pagination (only necessary fields for list view)
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = {};

    // nếu có categoryId thì lọc theo category
    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId;
    }

    // nếu có subcategoryId thì lọc theo subcategory
    if (req.query.subcategoryId) {
      filter.subcategoryId = req.query.subcategoryId;
    }

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .select("_id name price bestSeller brand images categoryId subcategoryId")
      .skip(skip)
      .limit(limit)
      .populate("categoryId", "name slug")     // lấy thông tin category
      .populate("subcategoryId", "name slug") // lấy thông tin subcategory
      .lean();

    const formattedProducts = products.map((p) => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      bestSeller: p.bestSeller,
      brand: p.brand,
      category: p.categoryId
        ? { _id: p.categoryId._id, name: p.categoryId.name }
        : null,
      subcategory: p.subcategoryId
        ? { _id: p.subcategoryId._id, name: p.subcategoryId.name }
        : null,
      image: p.images?.length ? p.images[0] : null,
    }));

    res.json({
      products: formattedProducts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one product by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found", id });
    }

    res.json(product);
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 Cập nhật sản phẩm
router.put("/:id", verifyAccessToken, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update product error:", err.message);
    res.status(400).json({ message: err.message });
  }
});


export default router;
