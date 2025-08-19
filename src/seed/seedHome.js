import mongoose from "mongoose";
import dotenv from "dotenv";
import Home from "../models/Home.js";

dotenv.config();
const ecosystem = [
  {
    name: "POS365",
    desc: "Phần mềm quản lý bán hàng",
    link: "https://easybooks.vn",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS07CQJNFZGW-TlrkyVzmNg9F8hRku4qWFfGA&s"
  },
  {
    name: "Tendoo",
    desc: "Phần mềm quản lý bán hàng",
    link: "https://easybooks.vn",
    icon: "https://chukysoviettel-ca.com/wp-content/uploads/2025/06/logo-tendoo.jpg"
  },
  {
    name: "easyPos",
    desc: "Phần mềm quản lý bán hàng",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon4.png"
  },

  {
    name: "1C",
    desc: "Phần mềm quản trị nhân lực / văn phòng / sale thị trường",
    link: "https://easybooks.vn",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzo2oSHI0jflNhN264DwsJ_M2IY579dtVvw&s"
  },
  {
    name: "easyHRM",
    desc: "Phần mềm quản trị nhân lực",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon2.png"
  },
  {
    name: "1Office",
    desc: "Phần mềm quản trị nhân lực / văn phòng / sale thị trường",
    link: "https://easybooks.vn",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/af/c3/1f/afc31f4d-149b-40c2-ccb8-34a563054f00/AppIcon-0-0-1x_U007emarketing-0-8-0-0-85-220.png/434x0w.webp"
  },

  {
    name: "Misa",
    desc: "Phần mềm kế toán",
    link: "https://easybooks.vn",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/05/d7/e1/05d7e1fc-9792-f76a-f501-f4d973028b6d/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/434x0w.webp"
  },
  {
    name: "easyBooks",
    desc: "Phần mềm kế toán",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon1.png"
  },

  {
    name: "Viettel",
    desc: "Phần mềm hóa đơn điện tử / chữ ký số / bảo hiểm xã hội / tra cứu hóa đơn / hợp đồng điện tử",
    link: "https://easybooks.vn",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOR_gI9heq7_pkyLJpz-vfbVn7TCyzDxKyH405QD-e2yvkApWuoZywUl_b5KUUcbov98c&usqp=CAU"
  },
  {
    name: "EasyInvoice",
    desc: "Phần mềm hóa đơn điện tử",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon3.png"
  },
  {
    name: "EasyCA",
    desc: "Phần mềm chữ ký số",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon5.png"
  },
  {
    name: "EasyDocs",
    desc: "Phần mềm hợp đồng điện tử",
    link: "https://easybooks.vn",
    icon: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec2-icon6.png"
  }
];

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
            text: "Năm kinh nghiệm\ntrong lĩnh vực CNTT"
          },
          {
            img: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/header-box-icon2.png",
            number: 400,
            suffix: "+",
            text: "Nhân sự làm việc\n tại Hà Nội và Hồ Chí Minh"
          },
          {
            img: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/header-box-icon3.png",
            number: 6000,
            suffix: "+",
            text: "Đại lý & CTV\n trên toàn quốc"
          },
          {
            img: "https://softdreams.vn/wp-content/themes/softdreams/assets/img/header-box-icon4.png",
            number: 350000,
            suffix: "+",
            text: "Doanh nghiệp & Hộ kinh doanh\n tin dùng sản phẩm"
          }
        ],
        sloganTitle: "SOFTDREAMS",
        sloganDesc: "Nâng tầm quản trị doanh nghiệp",
        link: "https://softdreams.vn/cong-ty"
      },
      ecosystem: {
        title: "Hệ sinh thái phần mềm doanh nghiệp",
        items: ecosystem
      },
      testimonial: {
        enabled: true,
        content:
          "Mỗi một sản phẩm chúng tôi tạo ra đều là những đứa con tinh thần của toàn bộ công ty. Chúng tôi yêu sản phẩm như chính những đứa con của mình để không ngừng khiến chúng trở nên hoàn thiện hơn. Tình yêu đó luôn được thắp sáng tới khắp nhân viên của công ty từ đội phần mềm, đội kinh doanh tới đội hỗ trợ triển khai.",
        author: "Ông Vũ Văn Luật",
        position: "Chủ tịch HĐQT - Giám đốc điều hành",
        image:
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec3-anhLuat.png"
      },
      culture: {
        title: "Văn hóa & Con ngư",
        images: [
          "https://picsum.photos/400?random=1",
          "https://picsum.photos/400?random=2",
          "https://picsum.photos/400?random=3",
          "https://picsum.photos/800/400?random=4", // ảnh dài
          "https://picsum.photos/400?random=5"
        ]
      },
      partners: {
        title: "Đối tác",
        images: [
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img1.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img2.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img3.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img4.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img5.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img6.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img7.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img8.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img9.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img10.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img11.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img12.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img13.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img14.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img15.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img16.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img17.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img18.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img19.png",
          "https://softdreams.vn/wp-content/themes/softdreams/assets/img/sec5-img20.png"
        ]
      },
      news: {
        enabled: true
      },
      contact: {
        items: [
          {
            title: "Hotline mua hàng",
            value: "090 707 91 68",
            icon: "phone"
          },
          {
            title: "Tổng đài hỗ trợ và CSKH",
            value: "090 707 91 68",
            icon: "headphones"
          },
          {
            title: "Zalo mua hàng",
            value: "Tư vấn dùng thử và mua hàng qua Zalo",
            icon: "zalo"
          },
          {
            title: "Zalo hỗ trợ",
            value: "Hỗ trợ sử dụng và CSKH qua Zalo",
            icon: "zalo"
          }
        ]
      }
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
