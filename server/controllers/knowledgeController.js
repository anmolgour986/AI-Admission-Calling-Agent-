const Knowledge = require("../models/Knowledge");
const fs = require("fs");
const path = require("path");

// =====================================
// Upload Knowledge File
// =====================================
const uploadKnowledge = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    let content = "";

    const ext = path.extname(req.file.originalname).toLowerCase();

    // TXT File
    if (ext === ".txt") {
      content = fs.readFileSync(req.file.path, "utf8");
    }

    // PDF support later
    if (ext === ".pdf") {
      content = "";
    }

    const knowledge = await Knowledge.create({
      title: req.body.title || req.file.originalname,
      filename: req.file.filename,
      originalname: req.file.originalname,
      fileType: req.file.mimetype,
      filePath: req.file.path,
      size: req.file.size,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Knowledge file uploaded successfully",
      data: knowledge,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get All Knowledge Files
// =====================================
const getKnowledgeFiles = async (req, res) => {
  try {
    const files = await Knowledge.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: files.length,
      data: files,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete Knowledge File
// =====================================
const deleteKnowledgeFile = async (req, res) => {
  try {
    const file = await Knowledge.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "Knowledge file not found",
      });
    }

    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    await Knowledge.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Knowledge file deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getKnowledgeContent = async (req, res) => {
  try {
    const files = await Knowledge.find().sort({
      createdAt: -1,
    });

    const knowledge = files
      .map((file) => file.content)
      .filter(Boolean)
      .join("\n\n--------------------\n\n");

    res.status(200).json({
      success: true,
      knowledge,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadKnowledge,
  getKnowledgeFiles,
  deleteKnowledgeFile,
  getKnowledgeContent,
};