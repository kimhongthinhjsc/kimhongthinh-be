import { StatusCodes } from "http-status-codes";

const uploadSingle = async (req, res, next) => {
  try {

    console.log(req);
    if (req.file) {
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Image loaded successfully!",
        url: req.file.path
      });
    } else {
      res.status(StatusCodes.REQUEST_TIMEOUT).json({
        error: "Can not upload photos!"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

const uploadMulti = async (req, res, next) => {
  try {
    if (req.files) {
      const images = req.files.map(item => ({ url: item.path }))

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Images loaded successfully!",
        images: images
      });
    } else {
      res.status(StatusCodes.REQUEST_TIMEOUT).json({
        success: false,
        error: "Can not upload photos!"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

const uploadVideo = async (req, res, next) => {
  try {
    if (req.file) {
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Video loaded successfully!",
        url: req.file.path
      });
    } else {
      res.status(StatusCodes.REQUEST_TIMEOUT).json({
        error: "Can not upload video!"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
export const uploadController = {
  uploadSingle,
  uploadMulti,
  uploadVideo
};
