import { StatusCodes } from "http-status-codes";
import Event from "../models/Event.js";


export const createEvent = async (req, res) => {
    try {
        const event = req.body;
        const newEvent = await Event.create(event);
        if (newEvent) {
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Posted successfully!",
                eventId: newEvent.id
            });
        } else {
            res.status(StatusCodes.REQUEST_TIMEOUT).json({
                success: false,
                message: "Posting failed!"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Posting failed!",
            error: error
        });
    }
}

export const getEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findOneAndUpdate(
            { titleLink: id },
            { $inc: { views: 1 } },   // tăng view lên 1
            { event: true }            // trả về document sau khi update
        );
        if (event) {
            res.status(StatusCodes.OK).json({
                success: true,
                event: event
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "News not found!"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Fetching news failed!",
            error: error
        });
    }
}

export const getEventId = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Event.findOne({ _id: id });
        if (event) {
            res.status(StatusCodes.OK).json({
                success: true,
                event: event
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Event not found!"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Fetching events failed!",
            error: error
        });
    }
}

export const updateEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const event = req.body;
        const eventUpdate = await Event.updateOne({ _id: id }, { $set: { ...event } });
        if (eventUpdate) {
            res.status(StatusCodes.OK).json({
                success: true,
                event: eventUpdate
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Event not found!"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Fetching news failed!",
            error: error
        });
    }
}

export const findAllEvents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const events = await Event.aggregate([
            {
                $addFields: {
                    year: { $year: "$updatedAt" },
                    month: { $month: "$updatedAt" }
                }
            },
            {
                $sort: {
                    year: -1,       // Năm mới trước
                    month: -1,      // Tháng mới trước
                    views: -1, // Ưu tiên nổi bật
                    createdAt: -1   // Ngày mới nhất
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);
        if (events) {
            res.status(StatusCodes.OK).json({
                success: true,
                events: events,
                totalPages: Math.ceil(await Event.countDocuments() / limit),
                currentPage: page
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Events not found!",
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Fetching news failed!",
            error: error
        });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedEvent = await Event.deleteOne({ _id: id });
        if (deletedEvent.deletedCount > 0) {
            res.status(StatusCodes.OK).json({
                success: true,
                message: "Event deleted successfully!"
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Event not found!"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Deleting events failed!",
            error: error
        });
    }
}