const express = require("express");
const router = express.Router();

const {
  getCallHistory,
  createCallHistory,
  deleteCallHistory,
} = require("../controllers/callHistoryController");

// ==============================
// Get All Call History
// ==============================

router.get("/", getCallHistory);

// ==============================
// Save Call History
// ==============================

router.post("/", createCallHistory);

// ==============================
// Delete Call History
// ==============================

router.delete("/:id", deleteCallHistory);

module.exports = router;