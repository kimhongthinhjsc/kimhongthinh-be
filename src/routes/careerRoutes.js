import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createCareer, deleteCareer, getAllCareerAdmin, getAllCareerNoExpire, getCareer, updateCareer } from "../controllers/careerController.js";

const router = express.Router();


router.post("/", verifyAccessToken, createCareer);
router.get("/find/admin", verifyAccessToken, getAllCareerAdmin);
router.get("/find/no-expire", getAllCareerNoExpire);
router.get("/:id", getCareer);
router.put("/:id", verifyAccessToken, updateCareer);
router.delete("/:id", verifyAccessToken, deleteCareer);



export default router;