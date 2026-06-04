import AdminLayout from "../../layouts/AdminLayout";

import StatCard from "../../components/dashboard/StatCard";
import RecentTimesheetsTable from "../../components/dashboard/RecentTimesheetsTable";
import ProjectsOverview from "../../components/dashboard/ProjectsOverview";

function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Manage projects, timesheets and reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Projects"
            value="18"
          />

          <StatCard
            title="Total Employees"
            value="42"
          />

          <StatCard
            title="Total Timesheets"
            value="156"
          />

          <StatCard
            title="Pending Reviews"
            value="23"
            valueColor="text-orange-500"
          />
        </div>

        <RecentTimesheetsTable />

        <ProjectsOverview />
      </div>
    </AdminLayout>
  );
}

export default Dashboard;