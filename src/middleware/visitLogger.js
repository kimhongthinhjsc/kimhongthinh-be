// src/middleware/visitLogger.js
import Visit from "../models/Visit.js";
import moment from "moment-timezone";

export const visitLogger = async (req, res, next) => {
  try {
    // Bỏ qua các route admin, auth, upload
    if (
      req.path.startsWith("/admin") ||
      req.path.startsWith("/api/auth") ||
      req.path.startsWith("/api/upload")
    ) {
      return next();
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    await Visit.create({
      ip,
      path: req.path,
      userAgent: req.headers["user-agent"],
      createdAt: moment().tz("Asia/Ho_Chi_Minh").toDate(), // giờ Việt Nam
    });
  } catch (err) {
    console.error("❌ Error logging visit:", err.message);
  }
  next();
};


