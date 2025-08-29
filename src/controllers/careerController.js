import { StatusCodes } from "http-status-codes";
import Career from "../models/Career.js"

export const createCareer = async (req, res) => {
    try {
        const career = req.body;
        const newCareer = await Career.create(career);
        if (newCareer) {
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Career created successfully!",
                careerId: newCareer.id
            });
        } else {
            res.status(StatusCodes.REQUEST_TIMEOUT).json({
                success: false,
                message: "Creating career failed!"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Creating career failed!",
            error: error
        });
    }
}

export const getAllCareerAdmin = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const careers = await Career.find().skip(skip).limit(limit);
        if (careers) {
            res.status(StatusCodes.OK).json({
                success: true,
                careers: careers,
                totalPages: Math.ceil(await Career.countDocuments() / limit),
                currentPage: page
            });
        } else {
            res.status(StatusCodes.OK).json({
                success: true,
                careers: [],
                message: "No careers found!"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Fetching careers failed!",
            error: error
        });
    }
};

export const getAllCareerNoExpire = async (req, res) => {
    try {
        const today = new Date();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Điều kiện chỉ lấy tin còn hạn
        const condition = { deadline: { $gte: today } };

        // Đếm tổng số tin còn hạn
        const totalCareers = await Career.countDocuments(condition);

        // Lấy danh sách tin còn hạn theo phân trang
        const careers = await Career.find(condition)
            .sort({ deadline: 1 }) // sắp xếp theo deadline
            .skip(skip)
            .limit(limit);

        res.status(StatusCodes.OK).json({
            success: true,
            careers,
            totalPages: Math.ceil(totalCareers / limit),
            currentPage: page,
            totalItems: totalCareers,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Fetching careers failed!",
            error: error.message,
        });
    }
};


export const getCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (career) {
            res.status(StatusCodes.OK).json({
                success: true,
                career: career
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Career not found!"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Fetching career failed!",
            error: error
        });
    }
};

export const updateCareer = async (req, res) => {
    try {
        const career = await Career.updateOne({ _id: req.params.id }, req.body);
        if (career) {
            res.status(StatusCodes.OK).json({
                success: true,
                career: career
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Career not found!"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Updating career failed!",
            error: error
        });
    }
};

export const deleteCareer = async (req, res) => {
    try {
        const career = await Career.deleteOne({ _id: req.params.id });
        if (career.deletedCount > 0) {
            res.status(StatusCodes.OK).json({
                success: true,
                message: "Career deleted successfully!"
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Career not found!"
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Deleting career failed!",
            error: error
        });
    }
};
