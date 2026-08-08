const express = require("express");
console.log("✅ studentRoutes loaded");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  createStudent,
  getStudents,
  updateStudent,
  uploadStudents,
  deleteStudent,
  getNextStudent,
  completeCall,
} = require("../controllers/studentController");

// ==============================
// Get Next Pending Student
// ==============================
router.get("/next", getNextStudent);

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
// Complete AI Call
// ==============================

router.put("/:id/call-complete", completeCall);


// ==============================
// Update Student
// ==============================
router.put("/:id", updateStudent);


// ==============================
// Delete Student
// ==============================
router.delete("/:id", deleteStudent);

module.exports = router;