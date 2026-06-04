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
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [timesheetDetails, setTimesheetDetails] = useState([]);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [modalMode, setModalMode] = useState("CREATE"); // "CREATE" | "EDIT"

  useEffect(() => {
    fetchTimesheets();
  }, []);

  useEffect(() => {
    let result = [...timesheets];

    if (searchTerm) {
      result = result.filter((ts) =>
        ts.submission_date?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      result = result.filter((ts) => ts.status === statusFilter);
    }

    setFilteredTimesheets(result);
  }, [timesheets, searchTerm, statusFilter]);

  const fetchTimesheets = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTimesheets();
      setTimesheets(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to communicate with master records repository.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (timesheet) => {
    try {
      setError("");
      const details = await getTimesheetDetails(timesheet.id);
      setSelectedTimesheet(timesheet);
      setTimesheetDetails(details || []);
      setIsViewOpen(true);
    } catch (err) {
      console.error(err);
      setError("Failed to parse localized timesheet sub-details.");
    }
  };

  const handleCreateOpen = () => {
    setModalMode("CREATE");
    setSelectedTimesheet(null);
    setTimesheetDetails([]);
    setIsFormOpen(true);
  };

  const handleEditOpen = async (timesheet) => {
    if (timesheet.is_locked) return;

    try {
      setError("");
      const details = await getTimesheetDetails(timesheet.id);
      setModalMode("EDIT");
      setSelectedTimesheet(timesheet);
      setTimesheetDetails(details || []);
      setIsFormOpen(true);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch lines for active workspace.");
    }
  };

  const handleMasterSubmit = async (masterData) => {
    try {
      setActionLoading(true);
      setError("");

      if (modalMode === "CREATE") {
        await createTimesheet(masterData);
        setIsFormOpen(false);
      } else {
        await updateTimesheet(selectedTimesheet.id, masterData);
      }
      
      await fetchTimesheets();
    } catch (err) {
      console.error(err);
      setError("Error synchronizing master setup attributes.");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Master Workflow with Improvement 2 integrated
  const handleDeleteTimesheet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this timesheet?")) return;

    try {
      setError("");
      await deleteTimesheet(id);
      
      // Cleanup open workspaces immediately if target row matches active modal context
      if (selectedTimesheet?.id === id) {
        setIsFormOpen(false);
        setSelectedTimesheet(null);
        setTimesheetDetails([]);
      }
      
      await fetchTimesheets();
    } catch (err) {
      console.error(err);
      setError("Failed to discard target master sheet record.");
    }
  };

  // Submit Master Workflow with Improvement 1 integrated
  const handleSubmitTimesheet = async (id) => {
    if (!window.confirm("Submit timesheet? This action will lock the timesheet.")) return;

    try {
      setError("");
      await submitTimesheet(id);
      
      // Clean open editing panels upon submission lock down cascade
      setIsFormOpen(false);
      setSelectedTimesheet(null);
      setTimesheetDetails([]);
      
      await fetchTimesheets();
    } catch (err) {
      console.error(err);
      setError("Failed to transition status vector via submission endpoint.");
    }
  };

  const handleAddDetailFlow = async (detailEntry) => {
    try {
      setError("");
      await createTimesheetDetail({
        timesheet_master: selectedTimesheet.id,
        ...detailEntry
      });

      const updatedDetails = await getTimesheetDetails(selectedTimesheet.id);
      setTimesheetDetails(updatedDetails || []);
      
      const updatedMasters = await getTimesheets();
      setTimesheets(updatedMasters || []);
    } catch (err) {
      console.error(err);
      setError("Could not register subline task row assignment.");
    }
  };

  const handleDeleteDetailFlow = async (detailId) => {
    try {
      setError("");
      await deleteTimesheetDetail(detailId);

      const updatedDetails = await getTimesheetDetails(selectedTimesheet.id);
      setTimesheetDetails(updatedDetails || []);

      const updatedMasters = await getTimesheets();
      setTimesheets(updatedMasters || []);
    } catch (err) {
      console.error(err);
      setError("Failed to discard target allocation entry line.");
    }
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Timesheets</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage chronological subline item hours allocation entries.</p>
          </div>
          <button
            onClick={handleCreateOpen}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            Create Timesheet
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-600 rounded-xl font-medium">
            ⚠️ {error}
          </div>
        )}

        <TimesheetFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-xl p-16 text-center text-slate-400 font-medium">
            <div className="w-7 h-7 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Reading active profile tracking indexes...
          </div>
        ) : filteredTimesheets.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-xl p-16 text-center text-slate-400">
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

      {/* Critical Bug Fixed: Setter function invoked correctly on close */}
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