import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import MonthSelector from "../../components/dashboard/MonthSelector";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMonthlyStats("");
  }, []);

  const fetchMonthlyStats = async (targetMonthStr) => {
    try {
      setLoading(true);
      setError("");
      
      // Query specific parameter path if declared
      const url = targetMonthStr 
        ? `${API_ENDPOINTS.DASHBOARD_STATS}?month=${targetMonthStr}`
        : API_ENDPOINTS.DASHBOARD_STATS;

      const response = await apiClient.get(url);
      setDashboardData(response.data);
      setCurrentMonth(response.data.selected_month);
    } catch (err) {
      console.error(err);
      setError("Failed to synchronize reporting context indices for the designated month target.");
    } finally {
      setLoading(false);
    }
  };

  const handleMonthToggle = (newMonthValue) => {
    fetchMonthlyStats(newMonthValue);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-7xl mx-auto p-16 text-center text-slate-400 font-medium">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Filtering ledger aggregations month wise...
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
            onClick={() => fetchMonthlyStats(currentMonth)}
            className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </AdminLayout>
    );
  }

  const { metrics, selectable_months } = dashboardData;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Dynamic Month Filtering Top Header Panel */}
        <MonthSelector
          selectedMonth={currentMonth}
          selectableMonths={selectable_months}
          onMonthChange={handleMonthToggle}
        />

        {/* Dynamic Context Block Matrix Display Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Projects Billing This Month"
            value={metrics.total_projects_active_this_month}
            icon="📁"
            colorClass="text-blue-600"
          />

          <DashboardCard
            title="Active Logged Employees"
            value={metrics.active_users_this_month}
            icon="👥"
            colorClass="text-teal-600"
          />

          <DashboardCard
            title="Timesheets Submitted (Month)"
            value={metrics.total_timesheets_submitted}
            icon="📝"
            colorClass="text-purple-600"
          />

          <DashboardCard
            title="Pending Approval Queue"
            value={metrics.pending_timesheets}
            icon="⏳"
            colorClass="text-amber-600"
          />

          <DashboardCard
            title="Locked Financial Rows"
            value={metrics.locked_timesheets}
            icon="🔒"
            colorClass="text-rose-600"
          />

          <DashboardCard
            title="Total Monthly Logged Work"
            value={`${Number(metrics.total_hours_logged).toFixed(2)} hrs`}
            icon="⏱️"
            colorClass="text-indigo-600"
          />
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;