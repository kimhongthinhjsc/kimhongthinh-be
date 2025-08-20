import Visit from "../models/Visit.js";

export const getVisitStats = async (req, res) => {
  try {
    const now = new Date();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(now);
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // về thứ 2
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, today, week, month, uniqueVisitors, topPages, dailyChart] =
      await Promise.all([
        Visit.countDocuments(),
        Visit.countDocuments({ createdAt: { $gte: startOfDay } }),
        Visit.countDocuments({ createdAt: { $gte: startOfWeek } }),
        Visit.countDocuments({ createdAt: { $gte: startOfMonth } }),
        Visit.distinct("ip").then((ips) => ips.length),
        Visit.aggregate([
          { $group: { _id: "$path", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]),
        Visit.aggregate([
          {
            $group: {
              _id: {
                y: { $year: "$createdAt" },
                m: { $month: "$createdAt" },
                d: { $dayOfMonth: "$createdAt" },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.y": 1, "_id.m": 1, "_id.d": 1 } },
        ]),
      ]);

    res.json({
      total,
      today,
      week,
      month,
      uniqueVisitors,
      topPages,
      dailyChart,
    });
  } catch (err) {
    console.error("❌ Error getting stats:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
