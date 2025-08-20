import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    path: { type: String, required: true },
    userAgent: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Tạo index để query nhanh
visitSchema.index({ createdAt: 1 });
visitSchema.index({ ip: 1 });

export default mongoose.model("Visit", visitSchema);
