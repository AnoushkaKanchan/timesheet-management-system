import { useEffect, useState } from "react";
import EmployeeLayout from "../../layouts/EmployeeLayout";
import EmployeeTimesheetsTable from "../../components/timesheets/EmployeeTimesheetsTable";
import TimesheetFilters from "../../components/timesheets/TimesheetFilters";
import TimesheetModal from "../../components/timesheets/TimesheetModal";
import TimesheetViewModal from "../../components/timesheets/TimesheetViewModal";

import {
  getTimesheets,
  getTimesheetDetails,
  createTimesheet,
  updateTimesheet,
  deleteTimesheet,
  submitTimesheet,
  createTimesheetDetail,
  deleteTimesheetDetail
} from "../../services/timesheetService";

function MyTimesheets() {
  const [timesheets, setTimesheets] = useState([]);
  const [filteredTimesheets, setFilteredTimesheets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [timesheetDetails, setTimesheetDetails] = useState([]);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [modalMode, setModalMode] = useState("CREATE"); // "CREATE" or "EDIT"

  useEffect(() => {
    fetchTimesheets();
  }, []);

  useEffect(() => {
    let filtered = [...timesheets];
    if (searchTerm) {
      filtered = filtered.filter((timesheet) =>
        timesheet.submission_date?.includes(searchTerm)
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
      setError("Failed to fetch timesheets.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (timesheet) => {
    try {
      setSelectedTimesheet(timesheet);
      setIsViewOpen(true);
      const detailsData = await getTimesheetDetails(timesheet.id);
      setTimesheetDetails(detailsData);
    } catch (err) {
      console.error("Failed to fetch details:", err);
    }
  };

  const handleEditOpen = async (timesheet) => {
    try {
      setSelectedTimesheet(timesheet);
      setModalMode("EDIT");
      setIsFormOpen(true);
      const detailsData = await getTimesheetDetails(timesheet.id);
      setTimesheetDetails(detailsData);
    } catch (err) {
      console.error("Failed to load edit workspace options:", err);
    }
  };

  const handleCreateOpen = () => {
    setSelectedTimesheet(null);
    setTimesheetDetails([]);
    setModalMode("CREATE");
    setIsFormOpen(true);
  };

  const handleMasterSubmit = async (formData) => {
    try {
      setActionLoading(true);
      if (modalMode === "CREATE") {
        const newMaster = await createTimesheet(formData);
        await fetchTimesheets();
        setSelectedTimesheet(newMaster);
        setModalMode("EDIT");
      } else {
        const updatedMaster = await updateTimesheet(selectedTimesheet.id, formData);
        setSelectedTimesheet(updatedMaster);
        await fetchTimesheets();
      }
    } catch (err) {
      console.error("Failed to save master record:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddDetailFlow = async (detailData) => {
    try {
      setActionLoading(true);
      const payload = { ...detailData, timesheet_master: selectedTimesheet.id };
      await createTimesheetDetail(payload);
      const detailsData = await getTimesheetDetails(selectedTimesheet.id);
      setTimesheetDetails(detailsData);
      await fetchTimesheets();
    } catch (err) {
      console.error("Failed to append row details item:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteDetailFlow = async (detailId) => {
    try {
      setActionLoading(true);
      await deleteTimesheetDetail(detailId);
      const detailsData = await getTimesheetDetails(selectedTimesheet.id);
      setTimesheetDetails(detailsData);
      await fetchTimesheets();
    } catch (err) {
      console.error("Failed to remove detail row tracking option:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmitTimesheet = async (id) => {
    if (!window.confirm("Are you sure you want to finalize this timesheet? This will lock editing capabilities.")) return;
    try {
      await submitTimesheet(id);
      await fetchTimesheets();
    } catch (err) {
      console.error("Failed to submit timesheet:", err);
    }
  };

  const handleDeleteTimesheet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this master timesheet row?")) return;
    try {
      await deleteTimesheet(id);
      await fetchTimesheets();
    } catch (err) {
      console.error("Failed to delete timesheet:", err);
    }
  };

  return (
    <EmployeeLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-900">My Timesheet Allocations</h1>
            <p className="text-xs text-slate-500 mt-0.5">Track, log, and submit your project billable hours distribution matrix indices.</p>
          </div>
          <button
            onClick={handleCreateOpen}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            + Register New Period
          </button>
        </div>

        <TimesheetFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {error && (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm font-medium">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading index allocation tables...
          </div>
        ) : filteredTimesheets.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-xl p-16 text-center text-slate-400 text-sm font-medium">
            No tracked timesheet logs found matching filter guidelines.
          </div>
        ) : (
          <EmployeeTimesheetsTable
            timesheets={filteredTimesheets}
            onView={handleView}
            onEdit={handleEditOpen}
            onDelete={handleDeleteTimesheet}
            onSubmit={handleSubmitTimesheet}
          />
        )}
      </div>

      <TimesheetViewModal
        isOpen={isViewOpen}
        onClose={() => {
          setIsViewOpen(false);
          setSelectedTimesheet(null);
          setTimesheetDetails([]);
        }}
        timesheet={selectedTimesheet}
        details={timesheetDetails}
      />

      <TimesheetModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedTimesheet(null);
          setTimesheetDetails([]);
        }}
        timesheet={selectedTimesheet}
        details={timesheetDetails}
        onMasterSubmit={handleMasterSubmit}
        onAddDetail={handleAddDetailFlow}
        onDeleteDetail={handleDeleteDetailFlow}
        loading={actionLoading}
        mode={modalMode}
      />
    </EmployeeLayout>
  );
}

export default MyTimesheets;