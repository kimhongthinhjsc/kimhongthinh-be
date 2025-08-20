import express from "express";
import { getCompanyProfile, updateCompanyProfile } from "../controllers/companyProfileController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCompanyProfile);
router.put("/", verifyAccessToken, updateCompanyProfile);

export default router;
