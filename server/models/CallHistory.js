const mongoose = require("mongoose");

const callHistorySchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      default: "",
      trim: true,
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

    duration: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      default: "",
      trim: true,
    },

    transcript: [
      {
        speaker: String,
        message: String,
      },
    ],

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    callDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CallHistory", callHistorySchema);