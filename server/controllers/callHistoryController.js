const CallHistory = require("../models/CallHistory");

// =======================================
// Get All Call History
// =======================================

const getCallHistory = async (req, res) => {
  try {
    const history = await CallHistory.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =======================================
// Create Call History
// =======================================

const createCallHistory = async (req, res) => {
  try {

    const history = await CallHistory.create(req.body);

    res.status(201).json({
      success: true,
      message: "Call history saved successfully",
      data: history,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =======================================
// Delete Call History
// =======================================

const deleteCallHistory = async (req, res) => {
  try {

    const history = await CallHistory.findByIdAndDelete(req.params.id);

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Call history not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Call history deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getCallHistory,
  createCallHistory,
  deleteCallHistory,
};