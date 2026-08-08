function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
    Interested: "bg-green-500/10 text-green-400 border border-green-500/30",
    Callback: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
    "No Answer": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
    "Not Interested": "bg-red-500/10 text-red-400 border border-red-500/30",
    "Admission Confirmed":
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        styles[status] || "bg-slate-700 text-white"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;