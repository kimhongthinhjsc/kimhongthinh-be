import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true }, // Vị trí tuyển dụng
        salary: { type: String, required: true }, // Mức lương
        experience: { type: String, default: "Không yêu cầu" }, // Kinh nghiệm
        deadline: { type: Date, required: true }, // Hạn nộp hồ sơ
        quantity: { type: Number, default: 1 }, // Số lượng tuyển
        description: { type: String, required: true },
        benefits: { type: String, default: "Chưa cập nhật" }, // Quyền lợi
        skills: { type: String, default: "Chưa cập nhật" }, // Kỹ năng yêu cầu
        contact: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String },
        }
    },
    { timestamps: true }
);

const Career = mongoose.model("Career", CareerSchema);

export default Career;
