import { StatusCodes } from "http-status-codes";
import News from "../models/News.js";


export const createNews = async (req, res) => {
    try {
        const news = req.body;
        const newPost = await News.create(news);
        if (newPost) {
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Posted successfully!",
                newsId: newPost.id
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

export const getNews = async (req, res) => {
    try {
        const id = req.params.id;
        const news = await News.findOne({ titleLink: id });
        if (news) {
            res.status(StatusCodes.OK).json({
                success: true,
                news: news
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

export const getNewsId = async (req, res) => {
    try {
        const id = req.params.id;
        const news = await News.findOne({ _id: id });
        if (news) {
            res.status(StatusCodes.OK).json({
                success: true,
                news: news
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

export const updateNews = async (req, res) => {
    try {
        const id = req.params.id;
        const news = req.body;
        const newUpdate = await News.updateOne({ _id: id }, { $set: { ...news } });
        if (newUpdate) {
            res.status(StatusCodes.OK).json({
                success: true,
                news: newUpdate
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

export const findAllNews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const news = await News.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        if (news) {
            res.status(StatusCodes.OK).json({
                success: true,
                news: news,
                totalPages: Math.ceil(await News.countDocuments() / limit),
                currentPage: page
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "News not found!",
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