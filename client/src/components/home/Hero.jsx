import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="max-w-7xl mx-auto min-h-[90vh] px-6 py-20 grid lg:grid-cols-2 gap-16 items-center"
    >
      {/* Left Side */}
      <div>
        <p className="text-cyan-400 font-semibold uppercase tracking-wider mb-4">
          Admission Management System
        </p>

        <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
          Smart Admission
          <br />
          <span className="text-cyan-400">Calling CRM</span>
        </h1>

        <p className="mt-6 text-slate-300 text-lg leading-8 max-w-xl">
          Manage student enquiries, follow-ups, call history and admissions
          from one powerful dashboard. Built to simplify the admission process
          for colleges and universities.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link
            to="/register"
            className="bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition-all duration-300 shadow-lg px-7 py-3 rounded-xl text-white font-semibold"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-cyan-400 hover:bg-cyan-500 hover:text-white hover:scale-105 transition-all duration-300 px-7 py-3 rounded-xl text-cyan-400 font-semibold"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 hover:border-cyan-500 transition-all duration-300">

        <h3 className="text-white text-2xl font-bold mb-6">
          Dashboard Preview
        </h3>

        <div className="grid grid-cols-3 gap-4">

          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-sm">Students</p>
            <h2 className="text-cyan-400 text-3xl font-bold mt-2">
              245
            </h2>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-sm">Calls Today</p>
            <h2 className="text-green-400 text-3xl font-bold mt-2">
              38
            </h2>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-sm">Interested</p>
            <h2 className="text-yellow-400 text-3xl font-bold mt-2">
              19
            </h2>
          </div>

        </div>

        <div className="mt-8">

          <h4 className="text-white font-semibold mb-4">
            Recent Calls
          </h4>

          <div className="space-y-3">

            <div className="flex justify-between items-center bg-slate-800 rounded-lg px-4 py-3">
              <div>
                <h5 className="text-white font-medium">
                  Anmol Sharma
                </h5>
                <p className="text-slate-400 text-sm">
                  BTECH
                </p>
              </div>

              <span className="text-cyan-400 font-medium">
                Interested
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-800 rounded-lg px-4 py-3">
              <div>
                <h5 className="text-white font-medium">
                  Shivam Sharma
                </h5>
                <p className="text-slate-400 text-sm">
                  MLS
                </p>
              </div>

              <span className="text-green-400 font-medium">
                Callback
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-800 rounded-lg px-4 py-3">
              <div>
                <h5 className="text-white font-medium">
                  Zahik Abas
                </h5>
                <p className="text-slate-400 text-sm">
                  B.Tech
                </p>
              </div>

              <span className="text-red-400 font-medium">
                No Answer
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;