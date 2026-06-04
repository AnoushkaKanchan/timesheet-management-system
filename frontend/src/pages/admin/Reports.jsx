import AdminLayout from "../../layouts/AdminLayout";
import ReportsCard from "../../components/reports/ReportsCard";

function Reports() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Reports
          </h1>

          <p className="mt-2 text-slate-600">
            Generate and export reports.
          </p>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ReportsCard
            title="Timesheet Report"
            description="Generate employee timesheet reports."
            buttonText="Export"
          />

          <ReportsCard
            title="Project Report"
            description="View project progress and activity."
            buttonText="Export"
          />

          <ReportsCard
            title="Employee Report"
            description="Export employee performance summary."
            buttonText="Export"
          />
        </div>

        {/* Recent Exports */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              Recent Exports
            </h2>
          </div>

          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span>
                  Timesheet_Report_May_2026.xlsx
                </span>

                <span className="text-slate-500">
                  03 Jun 2026
                </span>
              </li>

              <li className="flex justify-between">
                <span>
                  Project_Report_June_2026.xlsx
                </span>

                <span className="text-slate-500">
                  02 Jun 2026
                </span>
              </li>

              <li className="flex justify-between">
                <span>
                  Employee_Report_Q2.xlsx
                </span>

                <span className="text-slate-500">
                  01 Jun 2026
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Reports;