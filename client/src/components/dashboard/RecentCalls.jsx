import { useEffect, useState } from "react";
import api from "../../services/api";

function RecentCalls() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStudents(res.data.data.recentStudents);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Interested":
        return "text-green-400";
      case "Callback":
        return "text-yellow-400";
      case "No Answer":
        return "text-orange-400";
      case "Not Interested":
        return "text-red-400";
      default:
        return "text-cyan-400";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-8">
      <h2 className="text-xl font-semibold text-white mb-4">
        Recent Students
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-400 border-b border-slate-700">
            <th className="pb-3">Student</th>
            <th className="pb-3">Course</th>
            <th className="pb-3">Phone</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="py-6 text-center text-slate-400"
              >
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr
                key={student._id}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >
                <td className="py-4 text-white">
                  {student.name}
                </td>

                <td className="py-4 text-slate-300">
                  {student.course}
                </td>

                <td className="py-4 text-slate-300">
                  {student.phone}
                </td>

                <td className={`py-4 font-medium ${getStatusColor(student.status)}`}>
                  {student.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentCalls;