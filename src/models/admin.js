import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match:
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // validation đơn giản cho email
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
      index: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // => tự có createdAt & updatedAt
    versionKey: false,
  }
);

// Hash password nếu được chỉnh sửa
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method so sánh mật khẩu
adminSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// Unique indexes (email, username)
adminSchema.index({ email: 1 }, { unique: true });
adminSchema.index({ username: 1 }, { unique: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
