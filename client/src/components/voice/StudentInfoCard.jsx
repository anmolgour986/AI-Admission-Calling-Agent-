import {
  FaUserGraduate,
  FaPhoneAlt,
  FaEnvelope,
  FaBook,
  FaCircle,
  FaDatabase,
  FaClock,
} from "react-icons/fa";

function StudentInfoCard({ student }) {
  if (!student) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full flex items-center justify-center">
        <p className="text-slate-400">
          No student selected
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full">

      {/* Heading */}
      <h2 className="text-2xl font-bold text-white mb-6">
        Student Information
      </h2>

      {/* AI Status */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-5">

        <div className="flex items-center gap-2 text-green-400 font-semibold">
          <FaCircle className="text-xs animate-pulse" />
          AI Ready
        </div>

      </div>

      {/* Knowledge Base */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6">

        <div className="flex items-center gap-3">

          <FaDatabase className="text-cyan-400 text-xl" />

          <div>

            <p className="text-slate-400 text-sm">
              Knowledge Base
            </p>

            <p className="text-cyan-400 font-semibold">
              Loaded
            </p>

          </div>

        </div>

      </div>

      {/* Avatar */}

      <div className="flex flex-col items-center mb-8">

        <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-white text-3xl font-bold">

          {student.name?.charAt(0).toUpperCase()}

        </div>

        <h3 className="mt-4 text-xl font-bold text-white">
          {student.name}
        </h3>

      </div>

      {/* Details */}

      <div className="space-y-4">

        <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-3">

          <FaPhoneAlt className="text-cyan-400" />

          <div>

            <p className="text-slate-400 text-sm">
              Phone
            </p>

            <p className="text-white">
              {student.phone}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-3">

          <FaEnvelope className="text-cyan-400" />

          <div>

            <p className="text-slate-400 text-sm">
              Email
            </p>

            <p className="text-white break-all">
              {student.email}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-3">

          <FaBook className="text-cyan-400" />

          <div>

            <p className="text-slate-400 text-sm">
              Course
            </p>

            <p className="text-white">
              {student.course}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-3">

          <FaUserGraduate className="text-cyan-400" />

          <div>

            <p className="text-slate-400 text-sm">
              Status
            </p>

            <p className="text-yellow-400 font-semibold">
              {student.status}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-3">

          <FaClock className="text-cyan-400" />

          <div>

            <p className="text-slate-400 text-sm">
              Call Duration
            </p>

            <p className="text-white font-semibold">
              00:00
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentInfoCard;