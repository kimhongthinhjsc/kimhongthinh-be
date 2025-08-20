import mongoose from "mongoose";
import dotenv from "dotenv";
import CompanyProfile from "../models/CompanyProfile.js";

dotenv.config(); // load .env

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    const companyData = {
      logo: "https://hongthinh.vercel.app/assets/HongThinhTechnologyServices-iB3gCu5M.png",
      fanpage: "Công ty Cổ Phần Dịch Vụ Công Nghệ Hồng Thịnh",
      slogan: "Giải pháp công nghệ toàn diện cho doanh nghiệp & hộ kinh doanh",
      googleMapsEmbed: "https://www.google.com/maps/embed?...",
      hotline1: "090 707 91 68",
      hotline2: "0393931979",
      email: "pitshongthinh@gmail.com",
      addressMain: "945/3 Ấp 3, Phường Sơn Đông, Vĩnh Long",
      addressBranch: "Chi nhánh Hồ Chí Minh (bạn điền cụ thể)",
      ecommerce: {
        name: "lienketdoanhnghiepviet.vn",
        link: "https://lienketdoanhnghiepviet.vn"
      },
      website: {
        name: "hongthinh.vn",
        link: "https://hong-thinh-technology-services-comp.vercel.app/"
      },
      social: {
        facebook: "https://facebook.com/yourpage",
        youtube: "https://youtube.com/yourchannel",
        twitter: "https://twitter.com/youraccount",
        zalo: "https://zalo.me/yourzalo",
        tiktok: "https://tiktok.com/@youraccount"
      }
    };

    // Xóa dữ liệu cũ (nếu có) để tránh trùng
    await CompanyProfile.deleteMany({});
    await CompanyProfile.create(companyData);

    console.log("🎉 Seed CompanyProfile thành công!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seed();
