// controllers/analyticsController.js
const Symptom = require('../models/Symptom');

// @desc    Get overall symptom trends
// @route   GET /api/analytics/trends
// @access  Private (Admin or Authorized User)
const getSymptomTrends = async (req, res) => {
  try {
    const data = await Symptom.aggregate([
      {
        $group: {
          _id: "$symptomName",
          count: { $sum: 1 },
          latestDate: { $max: "$createdAt" }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      trends: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching symptom trends',
      error: error.message,
    });
  }
};

// @desc    Get daily symptom reporting count (for charts)
// @route   GET /api/analytics/daily
// @access  Private
const getDailySymptomStats = async (req, res) => {
  try {
    const stats = await Symptom.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);

    // Format for chart display
    const formatted = stats.map(item => ({
      date: `${item._id.day}-${item._id.month}-${item._id.year}`,
      count: item.count,
    }));

    res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching daily stats',
      error: error.message,
    });
  }
};

// @desc    Get top 5 reported symptoms (for dashboard pie chart)
// @route   GET /api/analytics/top-symptoms
// @access  Private
const getTopSymptoms = async (req, res) => {
  try {
    const topSymptoms = await Symptom.aggregate([
      {
        $group: {
          _id: "$symptomName",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      topSymptoms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching top symptoms',
      error: error.message,
    });
  }
};

module.exports = {
  getSymptomTrends,
  getDailySymptomStats,
  getTopSymptoms,
};
