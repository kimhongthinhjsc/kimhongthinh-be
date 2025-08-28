// src/controllers/statsController.js
import Visit from "../models/Visit.js";

export const getVisitStats = async (req, res) => {
  try {

    // Bắt đầu ngày/tuần/tháng/năm theo giờ VN
    const tz = "Asia/Ho_Chi_Minh";

    const startOfDay = new Date(
      new Date().toLocaleString("en-US", { timeZone: tz })
    );
    startOfDay.setHours(0, 0, 0, 0);

    const todayMoment = startOfDay;

    const startOfWeek = new Date(todayMoment);
    const day = todayMoment.getDay();
    const diff = todayMoment.getDate() - day + (day === 0 ? -6 : 1); // về thứ 2
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(todayMoment.getFullYear(), todayMoment.getMonth(), 1);

    const startOfYear = new Date(todayMoment.getFullYear(), 0, 1);

    const [total, todayCount, weekCount, monthCount, yearCount, uniqueVisitors, topPages, hourlyChartToday, dailyChartWeek, dailyChartMonth, monthlyChartYear] =
      await Promise.all([
        Visit.countDocuments(),
        Visit.countDocuments({ createdAt: { $gte: startOfDay } }),
        Visit.countDocuments({ createdAt: { $gte: startOfWeek } }),
        Visit.countDocuments({ createdAt: { $gte: startOfMonth } }),
        Visit.countDocuments({ createdAt: { $gte: startOfYear } }),
        Visit.distinct("ip").then((ips) => ips.length),
        Visit.aggregate([
          { $group: { _id: "$path", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]),
        // Biểu đồ theo giờ hôm nay
        Visit.aggregate([
          {
            $match: { createdAt: { $gte: startOfDay } },
          },
          {
            $group: {
              _id: { h: { $hour: { date: "$createdAt", timezone: tz } } },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.h": 1 } },
        ]),
        // Biểu đồ theo ngày tuần này
        Visit.aggregate([
          { $match: { createdAt: { $gte: startOfWeek } } },
          {
            $group: {
              _id: {
                y: { $year: { date: "$createdAt", timezone: tz } },
                m: { $month: { date: "$createdAt", timezone: tz } },
                d: { $dayOfMonth: { date: "$createdAt", timezone: tz } },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.y": 1, "_id.m": 1, "_id.d": 1 } },
        ]),
        // Biểu đồ theo ngày tháng này
        Visit.aggregate([
          { $match: { createdAt: { $gte: startOfMonth } } },
          {
            $group: {
              _id: {
                y: { $year: { date: "$createdAt", timezone: tz } },
                m: { $month: { date: "$createdAt", timezone: tz } },
                d: { $dayOfMonth: { date: "$createdAt", timezone: tz } },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.y": 1, "_id.m": 1, "_id.d": 1 } },
        ]),
        // Biểu đồ theo tháng năm nay
        Visit.aggregate([
          { $match: { createdAt: { $gte: startOfYear } } },
          {
            $group: {
              _id: {
                y: { $year: { date: "$createdAt", timezone: tz } },
                m: { $month: { date: "$createdAt", timezone: tz } },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.y": 1, "_id.m": 1 } },
        ]),
      ]);

    res.json({
      total,
      today: todayCount,
      week: weekCount,
      month: monthCount,
      year: yearCount,
      uniqueVisitors,
      topPages,
      hourlyChartToday,
      dailyChartWeek,
      dailyChartMonth,
      monthlyChartYear,
    });
  } catch (err) {
    console.error("❌ Error getting stats:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
