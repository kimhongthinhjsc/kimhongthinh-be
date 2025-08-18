import express from "express";
import Category from "../models/Category.js";
import Subcategory from "../models/SubCategory.js";

const router = express.Router();

/**
 * GET /api/categories
 * ?q=... (search theo tên)
 * ?page=1&limit=50 (phân trang – tuỳ chọn)
 */
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const skip = (page - 1) * limit;

    const q = (req.query.q || "").trim();
    const filter = q ? { name: { $regex: q, $options: "i" } } : {};

    const [total, items] = await Promise.all([
      Category.countDocuments(filter),
      Category.find(filter).sort({ name: 1 }).skip(skip).limit(limit).lean(),
    ]);

    res.json({
      categories: items.map(c => ({ _id: c._id, name: c.name, slug: c.slug })),
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/categories/:id/subcategories
 * Lấy danh sách subcategory theo categoryId
 */
router.get("/:id/subcategories", async (req, res) => {
  try {
    const { id } = req.params;

    const subs = await Subcategory.find({ categoryId: id })
      .sort({ name: 1 })
      .lean();

    res.json({
      subcategories: subs.map(s => ({
        _id: s._id,
        name: s.name,
        slug: s.slug,
        categoryId: s.categoryId,
      })),
      total: subs.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/subcategories
 * ?categoryId=... (tuỳ chọn – lọc theo categoryId)
 * ?q=... (search)
 */
router.get("/_all/subcategories", async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    const filter = {};
    if (req.query.categoryId) filter.categoryId = req.query.categoryId;
    if (q) filter.name = { $regex: q, $options: "i" };

    const subs = await Subcategory.find(filter)
      .populate("categoryId", "name slug")
      .sort({ name: 1 })
      .lean();

    res.json({
      subcategories: subs.map(s => ({
        _id: s._id,
        name: s.name,
        slug: s.slug,
        categoryId: s.categoryId?._id || s.categoryId,
        categoryName: s.categoryId?.name || null,
      })),
      total: subs.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
