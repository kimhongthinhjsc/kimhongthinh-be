// seedCategories.js
import mongoose from "mongoose";
import Category from "./models/Category.js";
import SubCategory from "./models/SubCategory.js";

await mongoose.connect(
  "mongodb+srv://maihuy7622:RIDdpq2MTuFJKYzU@softdreams-cluster.qkgp0mr.mongodb.net/TechnologyServices?retryWrites=true&w=majority"
);

async function seedCategories() {
  try {
    await Category.deleteMany();
    await SubCategory.deleteMany();

    // 1. Category
    const categories = await Category.insertMany([
      { name: "Thiết bị điện tử" },
      { name: "Quản trị điều hành" },
      { name: "Tài chính kế toán" },
    ]);

    const categoryMap = {};
    categories.forEach((c) => (categoryMap[c.name] = c._id));

    // 2. SubCategory
    await SubCategory.insertMany([
      // Thiết bị điện tử
      {
        name: "Máy tính văn phòng",
        categoryId: categoryMap["Thiết bị điện tử"],
      },
      {
        name: "Thiết bị POS bán hàng",
        categoryId: categoryMap["Thiết bị điện tử"],
      },

      // Quản trị điều hành
      {
        name: "Phần mềm quản lý bán hàng",
        categoryId: categoryMap["Quản trị điều hành"],
      },
      {
        name: "Phần mềm quản trị nhân lực",
        categoryId: categoryMap["Quản trị điều hành"],
      },
      {
        name: "Phần mềm quản trị văn phòng",
        categoryId: categoryMap["Quản trị điều hành"],
      },
      {
        name: "Phần mềm quản trị sale thị trường",
        categoryId: categoryMap["Quản trị điều hành"],
      },

      // Tài chính kế toán
      {
        name: "Phần mềm kế toán",
        categoryId: categoryMap["Tài chính kế toán"],
      },
      {
        name: "Phần mềm Hóa đơn điện tử",
        categoryId: categoryMap["Tài chính kế toán"],
      },
      {
        name: "Phần mềm Chữ ký số",
        categoryId: categoryMap["Tài chính kế toán"],
      },
      {
        name: "Phần mềm Bảo hiểm xã hội",
        categoryId: categoryMap["Tài chính kế toán"],
      },
      {
        name: "Phần mềm tra cứu hóa đơn",
        categoryId: categoryMap["Tài chính kế toán"],
      },
      {
        name: "Phần mềm Hợp đồng điện tử",
        categoryId: categoryMap["Tài chính kế toán"],
      },
    ]);

    console.log("✅ Seed Category/SubCategory thành công!");
  } catch (err) {
    console.error("❌ Lỗi seed:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedCategories();
