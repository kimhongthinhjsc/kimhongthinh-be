import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createNews, getNews, findAllNews } from "../controllers/newController.js";
const router = express.Router();


router.post("/", verifyAccessToken, createNews);
router.get("/:id", verifyAccessToken, getNews);
router.get("/all", verifyAccessToken, findAllNews);

export default router;