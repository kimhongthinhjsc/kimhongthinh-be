import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createNews, getNews, findAllNews, updateNews, getNewsId, deleteNews } from "../controllers/newController.js";
const router = express.Router();


router.post("/", verifyAccessToken, createNews);
router.put("/:id", verifyAccessToken, updateNews);
router.get("/find/all", findAllNews);
router.get("/:id", getNews);
router.get("/findId/:id", getNewsId);
router.delete("/:id", verifyAccessToken, deleteNews );


export default router;