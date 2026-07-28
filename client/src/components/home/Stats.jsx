import {
  FaUserGraduate,
  FaPhoneAlt,
  FaUniversity,
  FaChartLine,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUserGraduate className="text-5xl text-cyan-400" />,
    number: "500+",
    title: "Students Managed",
  },
  {
    icon: <FaPhoneAlt className="text-5xl text-cyan-400" />,
    number: "2500+",
    title: "Calls Recorded",
  },
  {
    icon: <FaUniversity className="text-5xl text-cyan-400" />,
    number: "50+",
    title: "Admission Campaigns",
  },
  {
    icon: <FaChartLine className="text-5xl text-cyan-400" />,
    number: "95%",
    title: "Success Rate",
  },
];

const Stats = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-widest font-semibold">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Trusted Admission CRM
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-lg">
            Designed to simplify student admission management with speed,
            security and powerful analytics.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                {item.icon}
              </div>

              <h3 className="text-5xl font-bold text-cyan-400">
                {item.number}
              </h3>

              <p className="text-slate-300 mt-4 text-lg">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Stats;