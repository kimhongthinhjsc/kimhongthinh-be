// seed.js
import mongoose from "mongoose";
import Product from "./models/Product.js";
import products from "../src/mock/products.js";
import SubCategory from "./models/SubCategory.js";
import Category from "./models/Category.js";

await mongoose.connect(
  "mongodb+srv://maihuy7622:RIDdpq2MTuFJKYzU@softdreams-cluster.qkgp0mr.mongodb.net/TechnologyServices?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

async function seed() {
  try {
    await Product.deleteMany(); // clear cũ

    const productDocs = [];
    for (const p of products) {
      // tìm subcategory theo tên
      const sub = await SubCategory.findOne({ name: p.subcategoryName });
      if (!sub) {
        console.error(`❌ Không tìm thấy SubCategory: ${p.subcategoryName}`);
        continue;
      }

      // tìm category theo tên
      const cat = await Category.findOne({ name: p.categoryName });
      if (!cat) {
        console.error(`❌ Không tìm thấy Category: ${p.categoryName}`);
        continue;
      }

      productDocs.push({
        ...p,
        subcategoryId: sub._id,
        categoryId: cat._id, // 👈 thêm categoryId vào sản phẩm
      });
    }

    if (productDocs.length > 0) {
      await Product.insertMany(productDocs);
      console.log("✅ Seed sản phẩm thành công!");
    } else {
      console.log("⚠️ Không có sản phẩm nào được seed.");
    }
  } catch (err) {
    console.error("❌ Lỗi seed:", err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
