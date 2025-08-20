import mongoose from "mongoose";
import dotenv from "dotenv";
import Introduce from "../models/Introduce.js"; // model tương ứng với Introduce page

dotenv.config();

// Data mẫu
const introduceData = {
  banner:
    "https://softdreams.vn/wp-content/uploads/2023/11/Group-2609280-1.png",
  somethingAbout: {
    title: "Đôi nét về Softdreams",
    subtitle:
      "Nâng tầm quản trị doanh nghiệp với các giải pháp công nghệ thông minh.",
    paragraphs: [
      "Softdreams là công ty công nghệ chuyên cung cấp các phần mềm thông minh giúp tự động hóa trong quản trị doanh nghiệp.",
      "Với hơn 11 năm kinh nghiệm, công ty đã phát triển thành công 12+ sản phẩm trong hệ sinh thái gồm: EasyInvoice, EasyCA, EasyBooks, EasyHRM, EasyPos, EasyDocs, EasyTransport, EasyPIT, EasyTicket, EasyKYC,...",
      "Với phương châm đặt khách hàng làm trung tâm, Softdreams hướng đến xây dựng sự tin tưởng của khách hàng vào sản phẩm tiện ích, dễ dùng cùng sự phục vụ chu đáo, luôn lắng nghe, thấu hiểu."
    ],
    stats: [
      { label: "Năm kinh nghiệm", value: "11+" },
      { label: "Sản phẩm", value: "12+" }
    ],
    image: "https://softdreams.vn/wp-content/uploads/2024/07/Group-2609320.png"
  },
  videoSection: {
    poster:
      "https://softdreams.vn/wp-content/uploads/2023/11/Group-2609213-1.png",
    videoUrl:
      "https://softdreams.vn/wp-content/uploads/2023/11/y2mate.com-Phim-ngan-gioi-thieu-Softdreams-va-Easybooks_1080p.mp4"
  },
  roadSection: {
    title: "Hành trình chạm mơ ước",
    image: "https://softdreams.vn/wp-content/uploads/2024/07/Group-2609653.png"
  },
  behaviorRules: {
    banner:
      "https://softdreams.vn/wp-content/uploads/2023/11/Group-2609279.png",
    mission: {
      title: "Sứ mệnh",
      text: "Sứ mệnh của Softdreams là giúp “Nâng tầm quản trị doanh nghiệp” thông qua những giải pháp đơn giản hóa công nghệ thông tin..."
    },
    vision: {
      title: "Tầm nhìn",
      text: "Softdreams nuôi trong mình khát vọng trở thành tập đoàn công nghệ thông tin hùng mạnh..."
    }
  },
  coreValue: {
    title: "Giá trị cốt lõi",
    image: "https://softdreams.vn/wp-content/uploads/2023/11/Group-2609306.png",
    values: [
      {
        title: "Dễ dùng",
        text: "Softdreams đã và đang bằng mọi nỗ lực nghiên cứu..."
      },
      {
        title: "Tin tưởng",
        text: "Xây dựng niềm tin vững chắc cho khách hàng..."
      },
      {
        title: "Lắng nghe",
        text: "Chúng tôi luôn lắng nghe mọi ý kiến đóng góp..."
      }
    ]
  },
  testimonials: [
    {
      img: "https://softdreams.vn/wp-content/uploads/2023/11/TAL-HOSPITALITY-1.png",
      text: "Chúng tôi khách giá cao về phong cách làm việc tận tình, nhanh chóng và kịp thời của đội ngũ Softdreams.",
      author: "Phan Thị Vân Anh",
      position: "Kế toán tổng hợp - Tal Hospitality"
    },
    {
      img: "https://softdreams.vn/wp-content/uploads/2023/11/lawforlife.png",
      text: "Softdreams là đơn vị uy tín hàng đầu về phần mềm và dịch vụ hỗ trợ DN hiệu quả...",
      author: "Lê Hoa",
      position: "Quản lý - Law for Life"
    },
    {
      img: "https://softdreams.vn/wp-content/uploads/2023/11/go-duc-thanh-1.png",
      text: "Chúng tôi đánh giá cao sự hỗ trợ chăm sóc khách hàng tận tình và chi phí hợp lý, phần mềm dễ dùng.",
      author: "Bùi Phương Thảo",
      position: "Giám đốc tài chính - Gỗ Đức Thành"
    }
  ]
};

const seedIntroduce = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://maihuy7622:RIDdpq2MTuFJKYzU@softdreams-cluster.qkgp0mr.mongodb.net/TechnologyServices?retryWrites=true&w=majority"
    );

    // Xóa dữ liệu cũ
    await Introduce.deleteMany();

    // Tạo dữ liệu mới
    await Introduce.create(introduceData);

    console.log("✅ Seed Introduce thành công!");
    process.exit();
  } catch (err) {
    console.error("❌ Lỗi seed Introduce:", err);
    process.exit(1);
  }
};

seedIntroduce();
