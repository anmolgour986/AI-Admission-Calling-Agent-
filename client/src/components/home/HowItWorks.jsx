import {
  FaUserPlus,
  FaSignInAlt,
  FaUserGraduate,
  FaChartLine,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-5xl text-cyan-400" />,
    title: "Register",
    description:
      "Create your account securely to access the Admission Calling CRM.",
  },
  {
    icon: <FaSignInAlt className="text-5xl text-cyan-400" />,
    title: "Login",
    description:
      "Sign in with your credentials and access your personalized dashboard.",
  },
  {
    icon: <FaUserGraduate className="text-5xl text-cyan-400" />,
    title: "Manage Students",
    description:
      "Add, update and manage student enquiries with complete information.",
  },
  {
    icon: <FaChartLine className="text-5xl text-cyan-400" />,
    title: "Track Admissions",
    description:
      "Monitor calls, follow-ups and admission progress in real time.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-widest font-semibold">
            Process
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            How It Works
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-lg">
            Start managing your admission process in just four simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                {step.icon}
              </div>

              <h3 className="text-white text-2xl font-semibold mb-4">
                {step.title}
              </h3>

              <p className="text-slate-400 leading-7">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;