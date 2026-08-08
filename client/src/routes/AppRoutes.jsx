import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Protected Pages
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import AddStudent from "../pages/AddStudent";
import Knowledge from "../pages/Knowledge";
import VoiceAgent from "../pages/VoiceAgent";
import CallHistory from "../pages/CallHistory";

// 404 Page
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/students"
            element={<Students />}
          />

          <Route
            path="/students/add"
            element={<AddStudent />}
          />

          <Route
            path="/students/edit/:id"
            element={<AddStudent />}
          />

          <Route
            path="/knowledge-base"
            element={<Knowledge />}
          />

          <Route
            path="/voice-agent"
            element={<VoiceAgent />}
          />

          <Route
            path="/call-history"
            element={<CallHistory />}
          />

        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;