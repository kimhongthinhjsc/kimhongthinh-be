import express from "express";
import authRoutes from "../routes/authRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";
import productRoutes from "../routes/productRoutes.js";
import categoryRoutes from "../routes/categoryRoutes.js"
import homeRoutes from "../routes/home.js";
import { StatusCodes } from "http-status-codes";
import { uploadRoute } from "./uploadRoute.js";


const router = express.Router();

// Check APIs v1/status
router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "API v1 are ready to use!",
    code: StatusCodes.OK
  });
});

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/home", homeRoutes);
router.use("/upload", uploadRoute);

export const APIs_V1 = router;
