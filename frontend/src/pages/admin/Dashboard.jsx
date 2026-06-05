import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { getDashboardStats } from "../../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load real-time workspace metrics overview.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto p-16 text-center text-slate-400 font-medium">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Synchronizing metrics database indices...
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto p-6">
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-600 rounded-xl font-medium shadow-sm">
            ⚠️ {error}
          </div>
          <button 
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Workspace Top Header Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Control Center</h1>
            <p className="text-sm text-slate-500 mt-0.5">Real-time platform activity metrics overview data summary.</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200 animate-pulse">
            Live Database Connected
          </span>
        </div>

        {/* Aggregated Real-time Analytics Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Active Projects"
            value={stats.total_projects}
            icon="📁"
            colorClass="text-blue-600"
          />

          <DashboardCard
            title="Registered Users"
            value={stats.total_users}
            icon="👥"
            colorClass="text-teal-600"
          />

          <DashboardCard
            title="Total Recorded Timesheets"
            value={stats.total_timesheets}
            icon="📝"
            colorClass="text-purple-600"
          />

          <DashboardCard
            title="Pending Actions Queue"
            value={stats.pending_timesheets}
            icon="⏳"
            colorClass="text-amber-600"
          />

          <DashboardCard
            title="Locked Records State"
            value={stats.locked_timesheets}
            icon="🔒"
            colorClass="text-rose-600"
          />

          <DashboardCard
            title="Cumulative Work Allocation"
            value={`${Number(stats.total_hours).toFixed(2)} hrs`}
            icon="⏱️"
            colorClass="text-indigo-600"
          />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;