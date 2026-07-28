import { FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      className="bg-slate-900 py-24"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>

          <p className="text-cyan-400 uppercase tracking-widest font-semibold">
            About Us
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4">
            Smart CRM Built For Admission Teams
          </h2>

          <p className="text-slate-400 mt-6 text-lg leading-8">
            AdmissionCRM is a modern Admission Calling Management
            System developed to help colleges and universities manage
            student enquiries, follow-ups, admissions and call history
            from one secure dashboard.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-cyan-400 text-xl" />
              <span className="text-slate-300">
                Student Record Management
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-cyan-400 text-xl" />
              <span className="text-slate-300">
                Call & Follow-up Tracking
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-cyan-400 text-xl" />
              <span className="text-slate-300">
                Dashboard Analytics
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-cyan-400 text-xl" />
              <span className="text-slate-300">
                Secure JWT Authentication
              </span>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8">

          <h3 className="text-white text-2xl font-bold mb-8">
            Why Choose AdmissionCRM?
          </h3>

          <div className="space-y-6">

            <div className="bg-slate-900 rounded-xl p-5">
              <h4 className="text-cyan-400 text-xl font-semibold">
                Easy To Use
              </h4>

              <p className="text-slate-400 mt-2">
                Clean and user-friendly interface for admission staff.
              </p>
            </div>

            <div className="bg-slate-900 rounded-xl p-5">
              <h4 className="text-cyan-400 text-xl font-semibold">
                Cloud Based
              </h4>

              <p className="text-slate-400 mt-2">
                Access your data securely anytime using MongoDB Atlas.
              </p>
            </div>

            <div className="bg-slate-900 rounded-xl p-5">
              <h4 className="text-cyan-400 text-xl font-semibold">
                Fast Performance
              </h4>

              <p className="text-slate-400 mt-2">
                Built using the MERN Stack for speed and scalability.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;