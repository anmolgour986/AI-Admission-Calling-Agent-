const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Admission Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Interested",
        "Callback",
        "No Answer",
        "Not Interested",
        "Admission Confirmed",
      ],
      default: "Pending",
    },

    // AI Agent Notes
    notes: {
      type: String,
      default: "",
      trim: true,
    },

    // Last Call Date
    lastCall: {
      type: Date,
      default: null,
    },

    // Number of Calls
    callCount: {
      type: Number,
      default: 0,
    },

    // Assigned Agent
    assignedAgent: {
      type: String,
      default: "",
    },

    // Call Recording URL (future use)
    recording: {
      type: String,
      default: "",
    },

    // AI Call Summary
    summary: {
      type: String,
      default: "",
    },

    // Follow-up Date
    followUpDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);