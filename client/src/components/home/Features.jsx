import {
  FaUserGraduate,
  FaPhoneAlt,
  FaChartBar,
  FaLock,
  FaCalendarCheck,
  FaDatabase,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserGraduate className="text-4xl text-cyan-400" />,
    title: "Student Management",
    description:
      "Manage student records, courses and admission details from one place.",
  },
  {
    icon: <FaPhoneAlt className="text-4xl text-cyan-400" />,
    title: "Call Tracking",
    description:
      "Track every student call, follow-up and conversation efficiently.",
  },
  {
    icon: <FaChartBar className="text-4xl text-cyan-400" />,
    title: "Analytics Dashboard",
    description:
      "View real-time admission statistics and performance insights.",
  },
  {
    icon: <FaCalendarCheck className="text-4xl text-cyan-400" />,
    title: "Follow-Up Management",
    description:
      "Never miss a follow-up with scheduled reminders and status updates.",
  },
  {
    icon: <FaLock className="text-4xl text-cyan-400" />,
    title: "Secure Authentication",
    description:
      "JWT based authentication keeps your application secure.",
  },
  {
    icon: <FaDatabase className="text-4xl text-cyan-400" />,
    title: "Cloud Database",
    description:
      "Store and access your data securely using MongoDB Atlas.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="text-center mb-16">
        <p className="text-cyan-400 font-semibold uppercase tracking-widest">
          Features
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
          Everything You Need
        </h2>

        <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-lg">
          Powerful tools to manage admissions, students,
          follow-ups and reports — all in one platform.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="mb-6">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">
              {feature.title}
            </h3>

            <p className="text-slate-400 leading-7">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;