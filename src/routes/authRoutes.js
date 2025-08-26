import express from "express";
import {
  checkAuth,
  login,
  refreshToken,
  logout
} from "../controllers/authController.js";

const router = express.Router();

router.get("/checkAuth", checkAuth);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;
