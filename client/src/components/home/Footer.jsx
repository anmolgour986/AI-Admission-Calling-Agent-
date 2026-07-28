import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Admission
              <span className="text-cyan-400">CRM</span>
            </h2>

            <p className="text-slate-400 mt-5 leading-7">
              A modern Admission Calling CRM built with the MERN Stack
              to simplify student admissions, call tracking and follow-ups.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li>
                <a href="#home" className="hover:text-cyan-400 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#features" className="hover:text-cyan-400 transition">
                  Features
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-cyan-400 transition">
                  About
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-cyan-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-slate-400">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-cyan-400" />
                gourprohit5611@gmail
                .com
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-cyan-400" />
                +91 8082510756
              </div>

            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-5">
              Connect
            </h3>

            <div className="flex gap-4">

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 p-4 rounded-xl hover:bg-cyan-500 transition"
              >
                <FaGithub className="text-white text-xl" />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 p-4 rounded-xl hover:bg-cyan-500 transition"
              >
                <FaLinkedin className="text-white text-xl" />
              </a>

            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-slate-500">
          © {new Date().getFullYear()} AdmissionCRM. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;