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

  if (loading && !dashboardData) {
    return (
      <AdminLayout>
        <div className="p-8 text-center text-slate-500 font-medium">
          Loading metrics reporting models...
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-600 rounded-xl m-6">
          ⚠️ {error}
        </div>
      </AdminLayout>
    );
  }

  const metrics = dashboardData?.metrics || {};
  const selectableMonths = dashboardData?.selectable_months || [];

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto px-4 py-2">
        
        {/* Month Dropdown Container Selection Layer */}
        <MonthSelector
          selectedMonth={currentMonth}
          selectableMonths={selectableMonths}
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
            title="Submitted Submissions"
            value={metrics.submitted_timesheets}
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