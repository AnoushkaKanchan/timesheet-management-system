import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import TimesheetsTable from "../../components/timesheets/TimesheetsTable";
import {
  getTimesheets,
  getTimesheetDetails,
} from "../../services/timesheetService";
import TimesheetViewModal from "../../components/timesheets/TimesheetViewModal";

function Timesheets() {
  const [timesheets, setTimesheets] = useState([]);
  const [filteredTimesheets, setFilteredTimesheets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [timesheetDetails, setTimesheetDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTimesheets();
  }, []);

  useEffect(() => {
    let filtered = [...timesheets];

    if (searchTerm) {
      filtered = filtered.filter((timesheet) =>
        timesheet.user
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTimesheets(filtered);
  }, [searchTerm, timesheets]);

  const fetchTimesheets = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTimesheets();
      setTimesheets(data);
    } catch (err) {
      setError("Failed to fetch historical administrative timesheets.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (timesheet) => {
    try {
      setSelectedTimesheet(timesheet);
      setIsModalOpen(true);
      const detailsData = await getTimesheetDetails(timesheet.id);
      setTimesheetDetails(detailsData);
    } catch (err) {
      console.error("Failed to load timesheet details profile map:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Administrative Ledger Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">Audit and inspect submitted project allocations across all company resources.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="relative w-full max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by employee email account reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {loading && (
          <div className="text-center py-12 text-slate-400 text-sm font-medium">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading historical tracking structures...
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && filteredTimesheets.length === 0 && (
          <div className="bg-white border border-dashed border-slate-200 rounded-xl p-16 text-center text-slate-400 text-sm font-medium">
            No active historical employee timesheets found matching input criteria.
          </div>
        )}

        {!loading && !error && filteredTimesheets.length > 0 && (
          <TimesheetsTable
            timesheets={filteredTimesheets}
            onView={handleView}
          />
        )}
      </div>

      <TimesheetViewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTimesheet(null);
          setTimesheetDetails([]);
        }}
        timesheet={selectedTimesheet}
        details={timesheetDetails}
      />
    </AdminLayout>
  );
}

export default Timesheets;