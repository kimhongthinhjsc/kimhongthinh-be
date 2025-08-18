// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên sản phẩm
    images: [{ type: String }], // Danh sách ảnh
    price: { type: Number, required: true }, // Giá bán
    bestSeller: { type: Boolean, default: false },

    // --- Thông tin nổi bật (bullet points) ---
    highlights: [{ type: String }],

    // --- Những đặc điểm nổi bật (có thể nhiều đoạn, kèm hình) ---
    features: [
      {
        title: { type: String },
        content: { type: String }, // nội dung text/HTML
        image: { type: String }, // ảnh minh họa (nếu có)
      },
    ],

    // --- Chi tiết sản phẩm (mô tả dài) ---
    description: { type: String },

    // --- Thông số kỹ thuật ---
    specifications: [
      {
        key: { type: String }, // Ví dụ: "CPU"
        value: { type: String }, // Ví dụ: "RK3568 lên tới 2.0GHz"
      },
    ],

    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    brand: { type: String },
    warranty: { type: String },
    stock: { type: Number, default: 0 }, // số lượng tồn kho
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
