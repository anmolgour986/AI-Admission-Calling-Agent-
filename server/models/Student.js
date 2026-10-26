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

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    lastCall: {
      type: Date,
      default: null,
    },

    callCount: {
      type: Number,
      default: 0,
    },

    assignedAgent: {
      type: String,
      default: "",
    },

    recording: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    followUpDate: {
      type: Date,
      default: null,
    },

    // Date admission was confirmed
    admissionConfirmedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);