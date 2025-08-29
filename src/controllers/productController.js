import Product from "../models/Product.js";

// Lấy danh sách sản phẩm (có phân trang + lọc)
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.categoryId) filter.categoryId = req.query.categoryId;
    if (req.query.subcategoryId) filter.subcategoryId = req.query.subcategoryId;

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .select("_id name price bestSeller brand images categoryId subcategoryId")
      .sort({ bestSeller: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("categoryId", "name slug")
      .populate("subcategoryId", "name slug")
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
      image: p.images?.length ? p.images[0] : null
    }));

    res.json({
      products: formattedProducts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy 1 sản phẩm theo id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("categoryId", "name") // chỉ lấy name

      .populate("subcategoryId", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found", id });
    }

    // chuyển sang object JS để thêm field mới
    const productObj = product.toObject();

    res.json({
      ...productObj,
      categoryName: product.categoryId?.name || null,
      subcategoryName: product.subcategoryId?.name || null,
      // giữ nguyên categoryId, subcategoryId như cũ
      categoryId: product._id
        ? product._doc.categoryId?._id || product._doc.categoryId
        : null,
      subcategoryId: product._id
        ? product._doc.subcategoryId?._id || product._doc.subcategoryId
        : null
    });
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update product error:", err.message);
    res.status(400).json({ message: err.message });
  }
};

//Tìm sản phẩm
export const searchProducts = async (req, res) => {
  try {
    const { keyword, page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    // Nếu không có keyword, trả về rỗng
    if (!keyword || keyword.trim() === "") {
      return res.json({ products: [], totalPages: 0, currentPage: page });
    }

    // Tìm theo name hoặc brand (regex, case-insensitive)
    const regex = new RegExp(keyword, "i");
    const filter = {
      $or: [{ name: regex }, { brand: regex }]
    };

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .select("_id name price bestSeller brand images categoryId subcategoryId")
      .sort({ bestSeller: -1, createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("categoryId", "name slug")
      .populate("subcategoryId", "name slug")
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
      image: p.images?.length ? p.images[0] : null
    }));

    res.json({
      products: formattedProducts,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (err) {
    console.error("Search products error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
// Xóa sản phẩm theo id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    await Product.findByIdAndDelete(id);

    res.json({ message: "Xóa sản phẩm thành công", id });
  } catch (err) {
    console.error("Delete product error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Tạo sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create product error:", err.message);
    res.status(400).json({ message: err.message });
  }
};
