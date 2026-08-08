const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const knowledgeRoutes = require("./routes/knowledgeRoutes");
const callHistoryRoutes = require("./routes/callHistoryRoutes");

const app = express();

// =============================
// Middleware
// =============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/call-history", callHistoryRoutes);

// =============================
// Static Folder
// =============================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =============================
// Routes
// =============================
app.use("/api/auth", authRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/knowledge", knowledgeRoutes);

// =============================
// Export App
// =============================
module.exports = app;