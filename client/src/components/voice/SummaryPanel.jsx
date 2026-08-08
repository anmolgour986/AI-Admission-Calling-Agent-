import {
  FaCheckCircle,
  FaPhoneAlt,
  FaQuestionCircle,
  FaClipboardList,
} from "react-icons/fa";

function SummaryPanel() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      {/* Heading */}

      <div className="flex items-center gap-3 mb-6">

        <FaClipboardList className="text-cyan-400 text-2xl" />

        <h2 className="text-2xl font-bold text-white">
          AI Generated Call Summary
        </h2>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Call Status */}

        <div className="bg-slate-800 rounded-xl p-5">

          <div className="flex items-center gap-3 mb-3">

            <FaCheckCircle className="text-green-400 text-xl" />

            <h3 className="text-white font-semibold">
              Call Result
            </h3>

          </div>

          <p className="text-green-400 font-bold text-lg">
            Interested
          </p>

        </div>

        {/* Questions */}

        <div className="bg-slate-800 rounded-xl p-5">

          <div className="flex items-center gap-3 mb-3">

            <FaQuestionCircle className="text-yellow-400 text-xl" />

            <h3 className="text-white font-semibold">
              Questions Asked
            </h3>

          </div>

          <ul className="text-slate-300 space-y-2 text-sm">

            <li>• Course Duration</li>

            <li>• Hostel Facility</li>

            <li>• Scholarship</li>

          </ul>

        </div>

        {/* Next Action */}

        <div className="bg-slate-800 rounded-xl p-5">

          <div className="flex items-center gap-3 mb-3">

            <FaPhoneAlt className="text-cyan-400 text-xl" />

            <h3 className="text-white font-semibold">
              Next Action
            </h3>

          </div>

          <p className="text-cyan-400 font-semibold">
            Schedule Callback Tomorrow
          </p>

        </div>

      </div>

      {/* Conversation Summary */}

      <div className="mt-6 bg-slate-800 rounded-xl p-5">

        <h3 className="text-white font-semibold mb-3">
          Conversation Summary
        </h3>

        <p className="text-slate-300 leading-7">

          The student showed interest in the B.Tech CSE program and
          asked about tuition fees, hostel facilities, and scholarship
          opportunities. The AI answered all queries using the uploaded
          knowledge base. The student requested a follow-up call after
          discussing the admission process with family members.

        </p>

      </div>

    </div>
  );
}

export default SummaryPanel;