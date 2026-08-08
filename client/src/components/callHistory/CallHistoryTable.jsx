import { FaEye } from "react-icons/fa";
import StatusBadge from "./StatusBadge";

function CallHistoryTable({ data = [], loading }) {
  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
        Loading call history...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white">
          Call Records
        </h2>

        <p className="text-slate-400 mt-1">
          Complete history of AI admission calls.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">

          <thead className="bg-slate-800">
            <tr>
              <th className="text-left text-slate-300 px-6 py-4">Student</th>
              <th className="text-left text-slate-300 px-6 py-4">Phone</th>
              <th className="text-left text-slate-300 px-6 py-4">Course</th>
              <th className="text-left text-slate-300 px-6 py-4">Status</th>
              <th className="text-left text-slate-300 px-6 py-4">Duration</th>
              <th className="text-left text-slate-300 px-6 py-4">Date</th>
              <th className="text-center text-slate-300 px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-slate-400 py-10"
                >
                  No Call History Found
                </td>
              </tr>
            ) : (
              data.map((call) => (
                <tr
                  key={call._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="px-6 py-5 font-semibold text-white">
                    {call.studentName}
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {call.phone}
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {call.course}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={call.status} />
                  </td>

                  <td className="px-6 py-5 text-cyan-400 font-semibold">
                    {call.duration}s
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {new Date(call.callDate).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <button className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 transition px-4 py-2 rounded-lg text-white">
                      <FaEye />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between">
        <p className="text-slate-400">
          Showing <span className="text-white font-semibold">{data.length}</span> records
        </p>

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300">
            Previous
          </button>

          <button className="px-4 py-2 rounded-lg bg-cyan-600 text-white">
            1
          </button>

          <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300">
            Next
          </button>
        </div>
      </div>

    </div>
  );
}

export default CallHistoryTable;