import AdminLayout from "../../layouts/AdminLayout";
import TimesheetsTable from "../../components/timesheets/TimesheetsTable";

function Timesheets() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Timesheets
          </h1>

          <p className="mt-2 text-slate-600">
            Review and manage employee timesheets.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search employee..."
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2"
            />

            <select className="border border-slate-300 rounded-lg px-4 py-2">
              <option>All Status</option>
              <option>Draft</option>
              <option>Submitted</option>
              <option>Approved</option>
            </select>
          </div>
        </div>

        <TimesheetsTable />
      </div>
    </AdminLayout>
  );
}

export default Timesheets;