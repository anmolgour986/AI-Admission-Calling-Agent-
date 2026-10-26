import { FaTimes } from "react-icons/fa";

function CallDetailsModal() {
  // Abhi false rakha hai. Baad me state se control karenge.
  const isOpen = false;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Call Details
            </h2>

            <p className="text-slate-400 mt-1">
              AI Admission Call Summary
            </p>

          </div>

          <button className="text-slate-400 hover:text-white transition">
            <FaTimes size={20} />
          </button>

        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Student</p>
              <p className="text-white font-semibold mt-1">
                Anmol Sharma
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Course</p>
              <p className="text-white font-semibold mt-1">
                B.Tech CSE
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Call Duration</p>
              <p className="text-cyan-400 font-semibold mt-1">
                03:42
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-slate-400 text-sm">Status</p>
              <p className="text-green-400 font-semibold mt-1">
                Interested
              </p>
            </div>

          </div>

          {/* Summary */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-3">
              AI Summary
            </h3>

            <div className="bg-slate-800 rounded-xl p-4 text-slate-300 leading-7">
              Student showed interest in admission. Asked about hostel,
              scholarship and fee structure. Counselor follow-up is
              recommended.
            </div>

          </div>

          {/* Notes */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-3">
              Notes
            </h3>

            <div className="bg-slate-800 rounded-xl p-4 text-slate-300 leading-7">
              Follow up within the next 2 days. Student requested detailed fee
              brochure on WhatsApp.
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-800 flex justify-end">

          <button className="bg-cyan-600 hover:bg-cyan-700 transition text-white px-6 py-2 rounded-xl">
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default CallDetailsModal;
