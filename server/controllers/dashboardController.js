const Student = require("../models/Student");

const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const interested = await Student.countDocuments({
      status: "Interested",
    });

    const callback = await Student.countDocuments({
      status: "Callback",
    });

    const noAnswer = await Student.countDocuments({
      status: "No Answer",
    });

    const notInterested = await Student.countDocuments({
      status: "Not Interested",
    });

    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        interested,
        callback,
        noAnswer,
        notInterested,
        recentStudents,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};