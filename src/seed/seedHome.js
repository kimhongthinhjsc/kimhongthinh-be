import mongoose from "mongoose";
import dotenv from "dotenv";
import Home from "../models/Home.js";

dotenv.config();

const seedHome = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://maihuy7622:RIDdpq2MTuFJKYzU@softdreams-cluster.qkgp0mr.mongodb.net/TechnologyServices?retryWrites=true&w=majority"
    );

    // Xóa dữ liệu cũ
    await Home.deleteMany();

    // Tạo dữ liệu mẫu
    const homeData = {
      hero: {
        background:
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/banner.png",
        title: "Chuyển đổi số QUẢN TRỊ DOANH NGHIỆP",
        subtitle:
          "Chúng tôi cung cấp hệ sinh thái phần mềm giúp doanh nghiệp dễ dàng chuyển đổi số quản trị và vận hành",
        stats: [
          {
            img: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/header-box-icon1.png",
            number: 13,
            suffix: "+",
            text: "Năm kinh nghiệm\ntrong lĩnh vực CNTT",
          },
          {
            img: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/header-box-icon2.png",
            number: 400,
            suffix: "+",
            text: "Nhân sự làm việc\n tại Hà Nội và Hồ Chí Minh",
          },
          {
            img: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/header-box-icon3.png",
            number: 6000,
            suffix: "+",
            text: "Đại lý & CTV\n trên toàn quốc",
          },
          {
            img: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/header-box-icon4.png",
            number: 350000,
            suffix: "+",
            text: "Doanh nghiệp & Hộ kinh doanh\n tin dùng sản phẩm",
          },
        ],
        sloganTitle: "SOFTDREAMS",
        sloganDesc: "Nâng tầm quản trị doanh nghiệp",
        link: "https://softdreams.vn/cong-ty",
      },
      ecosystem: {
        enabled: true,
        description: "Hệ sinh thái sản phẩm Easy...",
      },
      testimonial: {
        enabled: true,
      },
      culture: {
        enabled: true,
      },
      partners: {
        enabled: true,
      },
      news: {
        enabled: true,
      },
      contact: {
        hotline: "1900 9999",
      },
    };

    await Home.create(homeData);

    console.log("✅ Seed Home thành công!");
    process.exit();
  } catch (err) {
    console.error("❌ Lỗi seed:", err);
    process.exit(1);
  }
};

seedHome();
