const Knowledge = require("../models/Knowledge");

// Create Knowledge
const createKnowledge = async (req, res) => {
  try {
    const knowledge = await Knowledge.create(req.body);

    res.status(201).json({
      success: true,
      message: "Knowledge added successfully",
      data: knowledge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Knowledge
const getKnowledge = async (req, res) => {
  try {
    const knowledge = await Knowledge.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: knowledge.length,
      data: knowledge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Knowledge
const deleteKnowledge = async (req, res) => {
  try {
    const knowledge = await Knowledge.findByIdAndDelete(
      req.params.id
    );

    if (!knowledge) {
      return res.status(404).json({
        success: false,
        message: "Knowledge not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Knowledge deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createKnowledge,
  getKnowledge,
  deleteKnowledge,
};