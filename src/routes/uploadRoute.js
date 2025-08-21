import express from "express";
import { uploadController } from "../controllers/uploadController.js";
import fileImage from "../upload/uploadCloudinary.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post(
  "/image",
  verifyAccessToken,
  fileImage.single("file"),
  uploadController.uploadSingle
);
router.post(
  "/images",
  verifyAccessToken,
  fileImage.array("file", 5),
  uploadController.uploadMulti
);
router.post(
  "/video",
  verifyAccessToken,
  fileImage.single("file"),
  uploadController.uploadVideo
);

export const uploadRoute = router;
