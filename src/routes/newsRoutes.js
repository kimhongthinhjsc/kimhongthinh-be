import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createNews, getNews, findAllNews } from "../controllers/newController.js";
const router = express.Router();


router.post("/", verifyAccessToken, createNews);
router.get("/all", verifyAccessToken, findAllNews);
router.get("/:id", verifyAccessToken, getNews);


export default router;