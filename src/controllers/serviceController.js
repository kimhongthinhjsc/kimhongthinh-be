import Service from "../models/Service.js";

// Lấy danh sách dịch vụ (có phân trang + lọc)
export const getAllServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const total = await Service.countDocuments(filter);

    const services = await Service.find(filter)
      .select("_id name thumbnail category")
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      services,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    console.error("Get services error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Lấy 1 dịch vụ theo id
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found", id });
    }

    res.json(service);
  } catch (error) {
    console.error("Get service by id error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Tìm kiếm dịch vụ theo keyword
export const searchServices = async (req, res) => {
  try {
    const { keyword = "", page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    // Nếu không có keyword, trả về rỗng
    if (!keyword.trim()) {
      return res.json({
        services: [],
        totalPages: 0,
        currentPage: parseInt(page)
      });
    }

    const regex = new RegExp(keyword, "i"); // case-insensitive
    const filter = { $or: [{ name: regex }] };

    const total = await Service.countDocuments(filter);

    const services = await Service.find(filter)
      .select("_id name thumbnail category")
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      services,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (err) {
    console.error("Search services error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Tạo dịch vụ
export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật dịch vụ
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa dịch vụ
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
