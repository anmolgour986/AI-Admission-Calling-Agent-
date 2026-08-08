import { FaSearch, FaFilter, FaCalendarAlt } from "react-icons/fa";

function HistoryFilters() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Search */}
        <div className="relative">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search student..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
          />

        </div>

        {/* Status Filter */}
        <div className="relative">

          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <select
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Interested</option>
            <option>Callback</option>
            <option>No Answer</option>
            <option>Not Interested</option>
            <option>Admission Confirmed</option>
          </select>

        </div>

        {/* Date Filter */}
        <div className="relative">

          <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="date"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500"
          />

        </div>

      </div>

    </div>
  );
}

export default HistoryFilters;