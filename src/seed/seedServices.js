// src/seed/seedServicesFull.js
import Service from "../models/Service.js";
import mongoose from "mongoose";
// import slugify from "slugify";

const servicesData = [
  {
    category: "Thành lập doanh nghiệp",
    name: "Doanh nghiệp",
    shortDescription: "Tư vấn và thành lập công ty doanh nghiệp",
    description:
      "Chúng tôi hỗ trợ bạn thành lập công ty doanh nghiệp một cách nhanh chóng, hợp pháp, bao gồm mọi thủ tục giấy tờ.",
    process: [
      { step: "Bước 1", detail: "Tư vấn loại hình doanh nghiệp phù hợp" },
      { step: "Bước 2", detail: "Chuẩn bị hồ sơ thành lập công ty" },
      { step: "Bước 3", detail: "Nộp hồ sơ lên cơ quan nhà nước" },
      { step: "Bước 4", detail: "Nhận giấy phép kinh doanh" }
    ],
    documentsRequired: ["CMND/CCCD", "Địa chỉ trụ sở công ty", "Vốn điều lệ"],
    features: [
      {
        title: "Tư vấn miễn phí",
        content: "Tư vấn chi tiết mọi vấn đề liên quan đến doanh nghiệp",
        image: ""
      },
      {
        title: "Nhanh chóng",
        content: "Thủ tục được thực hiện trong vòng 7 ngày",
        image: ""
      }
    ],
    thumbnail: "/images/services/business.jpg",
    images: [
      "/images/services/business1.jpg",
      "/images/services/business2.jpg"
    ],
    price: 5000000,
    seoTitle: "Thành lập doanh nghiệp uy tín",
    seoDescription:
      "Dịch vụ thành lập doanh nghiệp nhanh chóng, hợp pháp, trọn gói."
  },
  {
    category: "Thành lập doanh nghiệp",
    name: "Hộ Kinh Doanh",
    shortDescription: "Hỗ trợ thành lập hộ kinh doanh",
    description:
      "Dịch vụ giúp bạn đăng ký hộ kinh doanh một cách đơn giản và nhanh chóng.",
    process: [
      { step: "Bước 1", detail: "Tư vấn loại hình kinh doanh phù hợp" },
      { step: "Bước 2", detail: "Chuẩn bị hồ sơ đăng ký" },
      { step: "Bước 3", detail: "Nộp hồ sơ lên cơ quan nhà nước" },
      { step: "Bước 4", detail: "Nhận giấy phép kinh doanh" }
    ],
    documentsRequired: [
      "CMND/CCCD",
      "Địa chỉ kinh doanh",
      "Ngành nghề kinh doanh"
    ],
    features: [
      { title: "Nhanh gọn", content: "Thủ tục đăng ký trong 3 ngày", image: "" }
    ],
    thumbnail: "/images/services/business_household.jpg",
    images: [],
    price: 2000000,
    seoTitle: "Đăng ký Hộ Kinh Doanh",
    seoDescription: "Hỗ trợ đăng ký hộ kinh doanh nhanh chóng, chính xác."
  },
  {
    category: "Bảo hộ thương hiệu",
    name: "Đăng ký độc quyền thương hiệu",
    shortDescription: "Bảo hộ thương hiệu độc quyền tại Việt Nam",
    description:
      "Chúng tôi giúp đăng ký thương hiệu độc quyền, bảo vệ sản phẩm và dịch vụ của bạn trước vi phạm.",
    process: [
      { step: "Bước 1", detail: "Kiểm tra tính hợp pháp và khả năng đăng ký" },
      { step: "Bước 2", detail: "Chuẩn bị hồ sơ đăng ký thương hiệu" },
      { step: "Bước 3", detail: "Nộp hồ sơ lên Cục Sở hữu trí tuệ" },
      { step: "Bước 4", detail: "Nhận văn bằng bảo hộ thương hiệu" }
    ],
    documentsRequired: [
      "Logo/Thương hiệu",
      "Giấy tờ doanh nghiệp",
      "Ngành nghề đăng ký"
    ],
    features: [
      {
        title: "Bảo vệ pháp lý",
        content: "Đảm bảo thương hiệu của bạn được bảo hộ hợp pháp",
        image: ""
      }
    ],
    thumbnail: "/images/services/brand_protection.jpg",
    images: [],
    price: 3000000,
    seoTitle: "Đăng ký thương hiệu độc quyền",
    seoDescription:
      "Dịch vụ đăng ký thương hiệu giúp bảo vệ sản phẩm và dịch vụ của bạn."
  },
  {
    category: "Bảo hộ thương hiệu",
    name: "Chứng nhận VSATTP",
    shortDescription: "Đảm bảo vệ sinh an toàn thực phẩm",
    description:
      "Dịch vụ giúp doanh nghiệp được cấp chứng nhận VSATTP, tuân thủ các quy định về an toàn thực phẩm.",
    process: [
      {
        step: "Bước 1",
        detail: "Kiểm tra cơ sở vật chất và quy trình sản xuất"
      },
      { step: "Bước 2", detail: "Chuẩn bị hồ sơ chứng nhận" },
      { step: "Bước 3", detail: "Nộp hồ sơ lên cơ quan nhà nước" },
      { step: "Bước 4", detail: "Nhận chứng nhận VSATTP" }
    ],
    documentsRequired: [
      "Giấy phép kinh doanh",
      "Hồ sơ sản xuất",
      "CMND/CCCD người đại diện"
    ],
    features: [
      {
        title: "Đảm bảo chuẩn",
        content: "Tuân thủ các tiêu chuẩn VSATTP",
        image: ""
      }
    ],
    thumbnail: "/images/services/vsattp.jpg",
    images: [],
    price: 2500000,
    seoTitle: "Chứng nhận VSATTP",
    seoDescription:
      "Dịch vụ chứng nhận vệ sinh an toàn thực phẩm uy tín, nhanh chóng."
  },
  {
    category: "Bảo hộ thương hiệu",
    name: "Hồ sơ thẩm định Quầy thuốc",
    shortDescription: "Hỗ trợ thẩm định quầy thuốc",
    description:
      "Chúng tôi giúp lập và thẩm định hồ sơ quầy thuốc theo đúng quy định của Bộ Y tế.",
    process: [
      { step: "Bước 1", detail: "Kiểm tra hồ sơ quầy thuốc hiện tại" },
      { step: "Bước 2", detail: "Hoàn thiện hồ sơ thẩm định" },
      { step: "Bước 3", detail: "Nộp hồ sơ lên cơ quan thẩm định" },
      { step: "Bước 4", detail: "Nhận giấy chứng nhận thẩm định" }
    ],
    documentsRequired: [
      "Giấy phép kinh doanh",
      "CMND/CCCD người quản lý",
      "Hồ sơ kỹ thuật quầy thuốc"
    ],
    features: [
      {
        title: "Hỗ trợ chuyên nghiệp",
        content: "Đảm bảo hồ sơ được duyệt nhanh chóng",
        image: ""
      }
    ],
    thumbnail: "/images/services/pharmacy_inspect.jpg",
    images: [],
    price: 2000000,
    seoTitle: "Hồ sơ thẩm định Quầy thuốc",
    seoDescription:
      "Dịch vụ lập và thẩm định hồ sơ quầy thuốc, nhanh chóng, chính xác."
  },
  {
    category: "Dịch vụ kế toán",
    name: "Kế toán thuế",
    shortDescription: "Dịch vụ kế toán thuế chuyên nghiệp",
    description:
      "Chúng tôi cung cấp dịch vụ kế toán thuế trọn gói, đảm bảo tuân thủ luật pháp và tối ưu chi phí.",
    process: [
      {
        step: "Bước 1",
        detail: "Thu thập thông tin tài chính của doanh nghiệp"
      },
      { step: "Bước 2", detail: "Lập báo cáo thuế hàng tháng/quý" },
      { step: "Bước 3", detail: "Nộp báo cáo thuế cho cơ quan nhà nước" },
      { step: "Bước 4", detail: "Tư vấn tối ưu thuế" }
    ],
    documentsRequired: [
      "Sổ sách kế toán",
      "Hóa đơn chứng từ",
      "Thông tin nhân sự"
    ],
    features: [
      {
        title: "Chuyên nghiệp",
        content: "Đội ngũ kế toán giàu kinh nghiệm",
        image: ""
      }
    ],
    thumbnail: "/images/services/accounting_tax.jpg",
    images: [],
    price: 4000000,
    seoTitle: "Dịch vụ kế toán thuế",
    seoDescription:
      "Dịch vụ kế toán thuế uy tín, chuyên nghiệp cho doanh nghiệp."
  }
];

// tạo slug tự động
// servicesData.forEach((service) => {
//   service.slug = slugify(service.name, { lower: true, strict: true });
// });

const seedServicesFull = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://maihuy7622:RIDdpq2MTuFJKYzU@softdreams-cluster.qkgp0mr.mongodb.net/TechnologyServices?retryWrites=true&w=majority"
    );
    await Service.deleteMany();
    await Service.insertMany(servicesData);
    console.log("Services seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedServicesFull();
