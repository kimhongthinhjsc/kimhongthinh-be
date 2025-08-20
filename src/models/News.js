import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        titleLink: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, required: true },
        author: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true });

const News = mongoose.model("News", NewsSchema);
export default News;