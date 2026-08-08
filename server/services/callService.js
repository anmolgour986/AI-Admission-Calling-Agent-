const Student = require("../models/Student");
const CallHistory = require("../models/CallHistory");

// ======================================
// Get Next Pending Student
// ======================================

const getNextPendingStudent = async () => {
  return await Student.findOne({
    status: "Pending",
  }).sort({ createdAt: 1 });
};

// ======================================
// Complete AI Call
// ======================================

const completeCall = async (
  studentId,
  {
    status,
    summary,
    notes,
    duration = 0,
    transcript = "",
    sentiment = "Neutral",
  }
) => {

  const student = await Student.findById(studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  student.status = status || student.status;
  student.summary = summary || "";
  student.notes = notes || "";
  student.lastCall = new Date();
  student.callCount += 1;

  await student.save();

  await CallHistory.create({
    student: student._id,
    studentName: student.name,
    phone: student.phone,
    email: student.email,
    course: student.course,

    status: student.status,
    summary,
    notes,

    duration,
    transcript,
    sentiment,

    startedAt: new Date(),
    endedAt: new Date(),
  });

  return student;
};

module.exports = {
  getNextPendingStudent,
  completeCall,
};