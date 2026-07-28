import { useEffect, useState } from "react";
import StatsCard from "../components/dashboard/StatsCard";
import RecentCalls from "../components/dashboard/RecentCalls";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    interested: 0,
    callback: 0,
    noAnswer: 0,
    notInterested: 0,
    recentStudents: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");

      setStats(res.data.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatsCard
          title="Total Students"
          value={loading ? "..." : stats.totalStudents}
          color="text-cyan-400"
        />

        <StatsCard
          title="Interested"
          value={loading ? "..." : stats.interested}
          color="text-green-400"
        />

        <StatsCard
          title="Callback"
          value={loading ? "..." : stats.callback}
          color="text-yellow-400"
        />

        <StatsCard
          title="No Answer"
          value={loading ? "..." : stats.noAnswer}
          color="text-red-400"
        />

      </div>

      <RecentCalls />

    </div>
  );
};

export default Dashboard;