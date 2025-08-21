// models/Service.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Ví dụ: "Thành lập doanh nghiệp"
  name: { type: String, required: true }, // Ví dụ: "Doanh nghiệp"
  slug: { type: String, required: false, unique: true },
  shortDescription: { type: String },
  description: { type: String }, // Mô tả chi tiết (nếu cần)
  process: [{ step: String, detail: String }],
  documentsRequired: [{ type: String }],
  seoTitle: { type: String },
  seoDescription: { type: String },
  price: { type: Number, required: true }, // Giá bán
  features: [
    {
      title: { type: String },
      content: { type: String }, // nội dung text/HTML
      image: { type: String } // ảnh minh họa (nếu có)
    }
  ],
  thumbnail: { type: String }, // Hình ảnh đại diện cho dịch vụ
  images: [{ type: String }], // Danh sách hình ảnh cho dịch vụ
  createdAt: { type: Date, default: Date.now }, // Ngày tạo dịch vụ
  updatedAt: { type: Date, default: Date.now } // Ngày cập nhật dịch vụ
});

export default mongoose.model("Service", serviceSchema);
