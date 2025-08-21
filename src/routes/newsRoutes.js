import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createNews, getNews, findAllNews, updateNews, getNewsId } from "../controllers/newController.js";
const router = express.Router();


router.post("/", verifyAccessToken, createNews);
router.put("/:id", verifyAccessToken, updateNews);
router.get("/find/all", verifyAccessToken, findAllNews);
router.get("/:id", verifyAccessToken, getNews);
router.get("/findId/:id", verifyAccessToken, getNewsId);


export default router;