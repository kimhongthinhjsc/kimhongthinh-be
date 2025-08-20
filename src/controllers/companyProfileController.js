import CompanyProfile from "../models/CompanyProfile.js";

// GET: lấy company profile
export const getCompanyProfile = async (req, res) => {
  try {
    const profile = await CompanyProfile.findOne(); // chỉ có 1 record
    if (!profile) {
      return res.status(404).json({ message: "Company profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT: cập nhật company profile
export const updateCompanyProfile = async (req, res) => {
  try {
    const profile = await CompanyProfile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // nếu chưa có thì tạo mới
    });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
