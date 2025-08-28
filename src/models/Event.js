import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        titleLink: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        image: { type: String, required: true },
        author: { type: String, required: true },
        views: { type: Number, default: 0 },
        location: { type: String, required: true },
        date: { type: Date, required: true }
    },
    { timestamps: true });

const Event = mongoose.model("Event", EventSchema);
export default Event;