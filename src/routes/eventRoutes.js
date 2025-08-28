import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createEvent, getEvent, findAllEvents, updateEvent, getEventId, deleteEvent, findPastEvents, findUpcomingEvents } from "../controllers/eventController.js";
const router = express.Router();


router.post("/", verifyAccessToken, createEvent);
router.put("/:id", verifyAccessToken, updateEvent);
router.get("/find/all", findAllEvents);
router.get("/find/upcoming", findUpcomingEvents);
router.get("/find/past", findPastEvents);

router.get("/findId/:id", getEventId);
router.get("/:id", getEvent);
router.delete("/:id", verifyAccessToken, deleteEvent);


export default router;