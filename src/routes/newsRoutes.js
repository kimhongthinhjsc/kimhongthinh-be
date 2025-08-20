import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware";
import { createNews, getNews, findAllNews } from "../controllers/newController";
const router = express.Router();


router.post("/", verifyAccessToken, createNews);
router.get("/:id", verifyAccessToken, getNews);
router.get("/all", verifyAccessToken, findAllNews);

export default router;