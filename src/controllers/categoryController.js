import Category from "../models/Category.js";
import Subcategory from "../models/SubCategory.js";

// Lấy danh sách categories (có search + phân trang)
export const getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);
    const skip = (page - 1) * limit;

    const q = (req.query.q || "").trim();
    const filter = q ? { name: { $regex: q, $options: "i" } } : {};

    // Lấy categories
    const [total, items] = await Promise.all([
      Category.countDocuments(filter),
      Category.find(filter).sort({ name: 1 }).skip(skip).limit(limit).lean()
    ]);

    // Lấy toàn bộ subcategories theo categoryId
    const categoryIds = items.map((c) => c._id);
    const subs = await Subcategory.find({
      categoryId: { $in: categoryIds }
    }).lean();

    // Gắn subcategories vào đúng category
    const categoriesWithSubs = items.map((c) => ({
      _id: c._id,
      name: c.name,
      slug: c.slug,
      subcategories: subs
        .filter((s) => String(s.categoryId) === String(c._id))
        .map((s) => ({
          _id: s._id,
          name: s.name
        }))
    }));

    res.json({
      categories: categoriesWithSubs,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Thêm mới category
export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name là bắt buộc" });
    }

    const newCat = new Category({ name, slug });
    await newCat.save();

    res.status(201).json(newCat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật category
export const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xoá category
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy subcategories theo categoryId
export const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subs = await Subcategory.find({ categoryId: id })
      .sort({ name: 1 })
      .lean();

    res.json({
      subcategories: subs.map((s) => ({
        _id: s._id,
        name: s.name,
        slug: s.slug,
        categoryId: s.categoryId
      })),
      total: subs.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả subcategories (có filter categoryId + search)
export const getAllSubcategories = async (req, res) => {
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
      subcategories: subs.map((s) => ({
        _id: s._id,
        name: s.name,
        slug: s.slug,
        categoryId: s.categoryId?._id || s.categoryId,
        categoryName: s.categoryId?.name || null
      })),
      total: subs.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
