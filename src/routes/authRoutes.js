import express from "express";
import {
  checkAuth,
  login,
  refreshToken,
  logout,
  changePassword
} from "../controllers/authController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/checkAuth", checkAuth);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.post("/change-password", verifyAccessToken, changePassword);

export default router;
