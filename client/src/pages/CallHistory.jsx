import { useEffect, useState } from "react";
import api from "../services/api";

import HistoryFilters from "../components/callHistory/HistoryFilters";
import CallHistoryTable from "../components/callHistory/CallHistoryTable";
import CallDetailsModal from "../components/callHistory/CallDetailsModal";

function CallHistory() {
  const [callHistory, setCallHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCallHistory();
  }, []);

  const fetchCallHistory = async () => {
    try {
      setLoading(true);

      const res = await api.get("/call-history");

      setCallHistory(res.data.data || []);
    } catch (error) {
      console.error("Error fetching call history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Call History
          </h1>

          <p className="text-slate-400 mt-2">
            View and manage all AI admission calls.
          </p>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 px-5 py-3 rounded-xl">
          <span className="text-cyan-400 font-semibold">
            Total Calls : {callHistory.length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <HistoryFilters />

      {/* Table */}
      <CallHistoryTable
        data={callHistory}
        loading={loading}
      />

      {/* Modal */}
      <CallDetailsModal />
    </div>
  );
}

export default CallHistory;