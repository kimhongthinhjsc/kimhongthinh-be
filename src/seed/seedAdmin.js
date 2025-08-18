import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ⚡ Kết nối MongoDB trực tiếp (có thể thay bằng process.env.MONGO_URI nếu muốn dùng dotenv)
await mongoose.connect(
  "mongodb+srv://maihuy7622:RIDdpq2MTuFJKYzU@softdreams-cluster.qkgp0mr.mongodb.net/TechnologyServices?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Định nghĩa Schema cho Admin/User
const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "superadmin"], default: "admin" },
    refreshTokens: [refreshTokenSchema], // ⚡ mảng thay vì 1 string
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("User", userSchema);

// Hàm tạo admin mặc định
const createAdmin = async () => {
  try {
    const username = "superadmin";
    const email = "admin@example.com";
    const plainPassword = "123456"; // nhớ đổi cho an toàn
    const role = "superadmin";

    // Kiểm tra xem đã có admin này chưa
    let admin = await User.findOne({ email });
    if (admin) {
      console.log("⚠️ Admin đã tồn tại:", email);
    } else {
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      admin = new User({
        username,
        email,
        password: hashedPassword,
        role,
        refreshTokens: [], // ban đầu rỗng
      });

      await admin.save();
      console.log("✅ Admin mới đã được tạo:", email);
    }
  } catch (err) {
    console.error("❌ Lỗi khi tạo admin:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
