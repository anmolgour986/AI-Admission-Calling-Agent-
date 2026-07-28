import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaBook,
  FaPhoneAlt,
  FaHistory,
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Students", path: "/students", icon: <FaUserGraduate /> },
    { name: "Knowledge Base", path: "/knowledge-base", icon: <FaBook /> },
    { name: "Voice Agent", path: "/voice-agent", icon: <FaPhoneAlt /> },
    { name: "Call History", path: "/call-history", icon: <FaHistory /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 text-white p-5">
      <h1 className="text-2xl font-bold text-cyan-400 mb-8">
        ADMISSION CALLING AGENT
      </h1>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;