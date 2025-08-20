import SubCategory from "../models/SubCategory.js";

/**
 * Lấy tất cả subcategories (có filter/search)
 * GET /api/subcategories
 * ?categoryId=... (lọc theo category)
 * ?q=... (search theo tên)
 */
export const getSubcategories = async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    const filter = {};
    if (req.query.categoryId) filter.categoryId = req.query.categoryId;
    if (q) filter.name = { $regex: q, $options: "i" };

    const subs = await SubCategory.find(filter)
      .populate("categoryId", "name slug")
      .sort({ name: 1 })
      .lean();

    res.json({
      subcategories: subs.map((s) => ({
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
};

/**
 * Lấy subcategory theo id
 */
export const getSubcategoryById = async (req, res) => {
  try {
    const sub = await SubCategory.findById(req.params.id).populate(
      "categoryId",
      "name slug"
    );

    if (!sub) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Tạo subcategory mới
 */
export const createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ message: "Name và categoryId là bắt buộc" });
    }

    const newSub = new SubCategory({ name, categoryId });
    await newSub.save();

    res.status(201).json(newSub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Cập nhật subcategory
 */
export const updateSubcategory = async (req, res) => {
  try {
    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Xoá subcategory
 */
export const deleteSubcategory = async (req, res) => {
  try {
    const deleted = await SubCategory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
