const express = require("express");
const router = express.Router();

const upload = require("../middleware/knowledgeUploadMiddleware");

const {
  uploadKnowledge,
  getKnowledgeFiles,
  deleteKnowledgeFile,
  getKnowledgeContent,
} = require("../controllers/knowledgeController");

// ======================================
// Get All Knowledge Files
// ======================================
router.get("/", getKnowledgeFiles);

// ======================================
// Upload Knowledge File
// ======================================
router.get("/content", getKnowledgeContent);

router.post(
  "/upload",
  upload.single("file"),
  uploadKnowledge
);

// ======================================
// Delete Knowledge File
// ======================================
router.delete("/:id", deleteKnowledgeFile);

module.exports = router;