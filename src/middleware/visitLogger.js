import Visit from "../models/Visit.js";

export const visitLogger = async (req, res, next) => {
  try {
    // Bỏ qua các route admin, api auth, upload
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
    });
  } catch (err) {
    console.error("❌ Error logging visit:", err.message);
  }
  next();
};
