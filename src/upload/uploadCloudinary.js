import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { env } from "../config/environment.js";

cloudinary.v2.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.API_KEY,
  api_secret: env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "uploads",
    resource_type: "auto",
    allowed_formats: ["jpg", "png", "mp4", "mov", "avi"],
  },
});

const uploadCloud = multer({ storage });

export default uploadCloud;