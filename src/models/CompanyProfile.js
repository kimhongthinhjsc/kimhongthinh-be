import mongoose from "mongoose";

const CompanyProfileSchema = new mongoose.Schema(
  {
    logo: String,
    fanpage: String,
    slogan: String,
    googleMapsEmbed: String,
    hotline1: String,
    hotline2: String,
    email: String,
    addressMain: String,
    addressBranch: String,
    ecommerce: {
      name: String,
      link: String,
    },
    website: {
      name: String,
      link: String,
    },
    social: {
      facebook: String,
      youtube: String,
      twitter: String,
      zalo: String,
      tiktok: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CompanyProfile", CompanyProfileSchema);
