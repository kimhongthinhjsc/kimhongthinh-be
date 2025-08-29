import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createNews, getNews, findAllNews, updateNews, getNewsId, deleteNews, findAllNewsAdmin } from "../controllers/newController.js";
const router = express.Router();


router.post("/", verifyAccessToken, createNews);
router.put("/:id", verifyAccessToken, updateNews);
router.get("/find/admin", verifyAccessToken, findAllNewsAdmin); // Get all news articles for admin ?page=1&limit=10
router.get("/find/all", findAllNews); // Get all news articles ?page=1&limit=10
router.get("/:id", getNews); // Get news article by ID, id can be a ID or a titleLink
router.get("/findId/:id", getNewsId); //
router.delete("/:id", verifyAccessToken, deleteNews );


export default router;