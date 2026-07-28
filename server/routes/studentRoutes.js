const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  createStudent,
  getStudents,
  updateStudent,
  uploadStudents,
  deleteStudent,
} = require("../controllers/studentController");

// ==============================
// Get All Students
// ==============================
router.get("/", getStudents);

// ==============================
// Add Student
// ==============================
router.post("/", createStudent);

// ==============================
// Upload Excel
// ==============================
router.post(
  "/upload",
  upload.single("file"),
  uploadStudents
);

// ==============================
// Update Student
// ==============================
router.put("/:id", updateStudent);

// ==============================
// Delete Student
// ==============================
router.delete("/:id", deleteStudent);

module.exports = router;