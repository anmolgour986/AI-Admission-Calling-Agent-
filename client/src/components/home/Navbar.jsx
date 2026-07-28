import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-cyan-400"
        >
          Admission<span className="text-white">CRM</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 text-slate-300 font-medium">
          <a href="#home" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="#features" className="hover:text-cyan-400 transition">
            Features
          </a>

          <a href="#about" className="hover:text-cyan-400 transition">
            About
          </a>

          <a href="#contact" className="hover:text-cyan-400 transition">
            Contact
          </a>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <Link
            to="/login"
            className="px-5 py-2 border border-cyan-400 rounded-lg text-cyan-400 hover:bg-cyan-400 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;