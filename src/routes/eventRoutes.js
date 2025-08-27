import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createEvent, getEvent, findAllEvents, updateEvent, getEventId, deleteEvent } from "../controllers/eventController.js";
const router = express.Router();


router.post("/", verifyAccessToken, createEvent);
router.put("/:id", verifyAccessToken, updateEvent);
router.get("/find/all", findAllEvents);
router.get("/:id", getEvent);
router.get("/findId/:id", getEventId);
router.delete("/:id", verifyAccessToken, deleteEvent);


export default router;