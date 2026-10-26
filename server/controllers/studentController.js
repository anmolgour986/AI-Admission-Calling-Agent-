const Student = require("../models/Student");
const CallHistory = require("../models/CallHistory");
const xlsx = require("xlsx");
const fs = require("fs");

// ==============================
// Create Student
// ==============================
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Students
// ==============================
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Student
// ==============================
const updateStudent = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Set confirmation date when admission is confirmed.
    if (
      updates.status === "Admission Confirmed" &&
      !updates.admissionConfirmedAt
    ) {
      const existingStudent = await Student.findById(
        req.params.id
      );

      if (!existingStudent) {
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }

      updates.admissionConfirmedAt =
        existingStudent.admissionConfirmedAt || new Date();
    }

    // Clear the date if the admission status is reversed.
    if (updates.status && updates.status !== "Admission Confirmed") {
      updates.admissionConfirmedAt = null;
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Student
// ==============================
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Upload Students From Excel
// ==============================
const uploadStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an Excel file",
      });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const students = xlsx.utils.sheet_to_json(sheet);

    if (students.length === 0) {
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        success: false,
        message: "Excel file is empty",
      });
    }

    await Student.insertMany(students);

    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: `${students.length} students uploaded successfully`,
      count: students.length,
    });
  } catch (error) {
    console.error(error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==============================
// Get Next Pending Student
// ==============================

const getNextStudent = async (req, res) => {
  
  try {

    const student = await Student.findOne({
      status: "Pending"
    }).sort({ createdAt: 1 });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "No Pending students found"
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
// ==============================
// Complete AI Call
// ==============================
const completeCall = async (req, res) => {
  try {
    const {
      status,
      summary,
      notes,
      duration,
      transcript,
      callOutcome,
    } = req.body;

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Update Student
    student.status = status || student.status;
    student.summary = summary || "";
    student.notes = notes || "";
    student.lastCall = new Date();
    student.callCount += 1;

    await student.save();

    // Save Call History
    await CallHistory.create({
      student: student._id,
      studentName: student.name,
      phone: student.phone,
      course: student.course,
      status: student.status,
      duration: duration || 0,
      summary: summary || "",
      transcript: transcript || [],
      notes: notes || "",
      callDate: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Call completed successfully",
      data: student,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  createStudent,
  getStudents,
  updateStudent,
  completeCall,
  deleteStudent,
  uploadStudents,
  getNextStudent,
};