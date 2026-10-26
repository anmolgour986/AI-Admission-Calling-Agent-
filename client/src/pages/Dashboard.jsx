import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import StatsCard from "../components/dashboard/StatsCard";
import RecentCalls from "../components/dashboard/RecentCalls";
import api from "../services/api";

const STATUS_COLORS = {
  Interested: "#22c55e",
  "Not Interested": "#ef4444",
  Callback: "#eab308",
  Pending: "#64748b",
  "No Answer": "#f97316",
  "Admission Confirmed": "#06b6d4",
  Unknown: "#94a3b8",
};

const OUTCOME_COLORS = {
  Completed: "#22c55e",
  "No Answer": "#f97316",
  Busy: "#eab308",
  Failed: "#ef4444",
  "Callback Requested": "#06b6d4",
  Unknown: "#64748b",
};

const CHART_CARD =
  "bg-slate-900 border border-slate-800 rounded-2xl p-5 min-w-0";

const TOOLTIP_STYLE = {
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "10px",
  color: "#f8fafc",
};

const formatDate = (dateString) => {
  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const formatMonth = (monthString) => {
  const [year, month] = monthString.split("-").map(Number);

  return new Date(year, month - 1, 1).toLocaleDateString(
    "en-IN",
    {
      month: "short",
      year: "2-digit",
    }
  );
};

const EmptyChart = () => (
  <div className="h-[280px] flex items-center justify-center text-slate-500 text-sm">
    No data available yet
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    interested: 0,
    callback: 0,
    noAnswer: 0,
    notInterested: 0,
    admissionConfirmed: 0,
    overdueFollowUps: 0,
    followUpsDueToday: 0,
    recentStudents: [],
    charts: {
      callsMadeEachDay: [],
      interestDistribution: [],
      callOutcomes: [],
      leadsByCourse: [],
      followUpsDueOverTime: [],
      admissionConversionsByMonth: [],
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/dashboard");

      if (!res.data?.success) {
        throw new Error("Unable to load dashboard data");
      }

      setStats((previous) => ({
        ...previous,
        ...res.data.data,
        charts: {
          ...previous.charts,
          ...(res.data.data?.charts || {}),
        },
      }));
    } catch (err) {
      console.error("Error fetching dashboard:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const charts = stats.charts;

  const interestData = charts.interestDistribution.filter(
    (item) => item.count > 0
  );

  const outcomeData = charts.callOutcomes.filter(
    (item) => item.count > 0
  );

  const courseData = charts.leadsByCourse.filter(
    (item) => item.count > 0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Admission calling performance and analytics
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          disabled={loading}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
          title="Follow-ups Due Today"
          value={loading ? "..." : stats.followUpsDueToday}
          color="text-yellow-400"
        />

        <StatsCard
          title="Admissions Confirmed"
          value={loading ? "..." : stats.admissionConfirmed}
          color="text-purple-400"
        />
      </div>

      {/* Follow-up alerts */}
      {!loading && stats.overdueFollowUps > 0 && (
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
          <p className="font-semibold text-orange-300">
            {stats.overdueFollowUps} overdue follow-up
            {stats.overdueFollowUps !== 1 ? "s" : ""}
          </p>

          <p className="text-sm text-slate-400 mt-1">
            These students have follow-up dates in the past.
          </p>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 1. Calls Made Each Day */}
        <section className={CHART_CARD}>
          <h2 className="text-lg font-semibold text-white">
            Calls Made Each Day
          </h2>

          <p className="text-sm text-slate-400 mt-1 mb-5">
            Call activity over the last seven days
          </p>

          {charts.callsMadeEachDay.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={charts.callsMadeEachDay}>
                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  stroke="#94a3b8"
                  allowDecimals={false}
                />

                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelFormatter={(value) => formatDate(value)}
                />

                <Line
                  type="monotone"
                  dataKey="calls"
                  name="Calls"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </section>

        {/* 2. Interested vs Not Interested */}
        <section className={CHART_CARD}>
          <h2 className="text-lg font-semibold text-white">
            Student Interest Distribution
          </h2>

          <p className="text-sm text-slate-400 mt-1 mb-5">
            Current student status
          </p>

          {interestData.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={interestData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {interestData.map((entry, index) => (
                    <Cell
                      key={`${entry.status}-${index}`}
                      fill={
                        STATUS_COLORS[entry.status] ||
                        "#64748b"
                      }
                    />
                  ))}
                </Pie>

                <Tooltip contentStyle={TOOLTIP_STYLE} />

                <Legend
                  verticalAlign="bottom"
                  formatter={(value) => (
                    <span className="text-slate-300">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </section>

        {/* 3. Call Outcomes */}
        <section className={CHART_CARD}>
          <h2 className="text-lg font-semibold text-white">
            Call Outcomes
          </h2>

          <p className="text-sm text-slate-400 mt-1 mb-5">
            Distribution of recorded call attempts
          </p>

          {outcomeData.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={outcomeData}
                margin={{ bottom: 10 }}
              >
                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="outcome"
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={55}
                />

                <YAxis
                  stroke="#94a3b8"
                  allowDecimals={false}
                />

                <Tooltip contentStyle={TOOLTIP_STYLE} />

                <Bar
                  dataKey="count"
                  name="Calls"
                  radius={[5, 5, 0, 0]}
                >
                  {outcomeData.map((entry, index) => (
                    <Cell
                      key={`${entry.outcome}-${index}`}
                      fill={
                        OUTCOME_COLORS[entry.outcome] ||
                        "#64748b"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>

        {/* 4. Leads by Course */}
        <section className={CHART_CARD}>
          <h2 className="text-lg font-semibold text-white">
            Leads by Course
          </h2>

          <p className="text-sm text-slate-400 mt-1 mb-5">
            Number of students per course
          </p>

          {courseData.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer
              width="100%"
              height={Math.max(280, courseData.length * 42)}
            >
              <BarChart
                data={courseData}
                layout="vertical"
                margin={{ left: 15, right: 15 }}
              >
                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="3 3"
                />

                <XAxis
                  type="number"
                  stroke="#94a3b8"
                  allowDecimals={false}
                />

                <YAxis
                  type="category"
                  dataKey="course"
                  width={100}
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                />

                <Tooltip contentStyle={TOOLTIP_STYLE} />

                <Bar
                  dataKey="count"
                  name="Students"
                  fill="#8b5cf6"
                  radius={[0, 5, 5, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>

        {/* 5. Follow-ups Due Over Time */}
        <section className={CHART_CARD}>
          <h2 className="text-lg font-semibold text-white">
            Follow-ups Due Over Time
          </h2>

          <p className="text-sm text-slate-400 mt-1 mb-5">
            Scheduled follow-ups over the next fourteen days
          </p>

          {charts.followUpsDueOverTime.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={charts.followUpsDueOverTime}>
                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  interval={1}
                />

                <YAxis
                  stroke="#94a3b8"
                  allowDecimals={false}
                />

                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelFormatter={(value) => formatDate(value)}
                />

                <Line
                  type="monotone"
                  dataKey="count"
                  name="Follow-ups"
                  stroke="#eab308"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </section>

        {/* 6. Admission Conversions by Month */}
        <section className={CHART_CARD}>
          <h2 className="text-lg font-semibold text-white">
            Admission Conversions by Month
          </h2>

          <p className="text-sm text-slate-400 mt-1 mb-5">
            Confirmed admissions over the last six months
          </p>

          {charts.admissionConversionsByMonth.length === 0 ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={charts.admissionConversionsByMonth}
              >
                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                  tickFormatter={formatMonth}
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                  allowDecimals={false}
                />

                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelFormatter={(value) => formatMonth(value)}
                />

                <Line
                  type="monotone"
                  dataKey="admissions"
                  name="Admissions"
                  stroke="#a78bfa"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </section>
      </div>

      {/* Existing Recent Calls */}
      <RecentCalls />
    </div>
  );
};

export default Dashboard;