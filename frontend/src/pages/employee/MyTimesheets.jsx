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
  updateTimesheet
} from "../../services/timesheetService";

function MyTimesheets() {
  const [timesheets, setTimesheets] = useState([]);
  const [filteredTimesheets, setFilteredTimesheets] = useState([]);

  // Search & Filter Metrics
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  
  // Selection Matrix states
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [timesheetDetails, setTimesheetDetails] = useState([]);

  // Modal Flags
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [modalMode, setModalMode] = useState("CREATE"); // "CREATE" | "EDIT"

  useEffect(() => {
    fetchTimesheets();
  }, []);

  // Filter Engine Cascade (Corrected to search by submission_date for employees)
  useEffect(() => {
    let filtered = [...timesheets];

    if (searchTerm) {
      filtered = filtered.filter((ts) =>
        ts.submission_date?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((ts) => ts.status === statusFilter);
    }

    setFilteredTimesheets(filtered);
  }, [timesheets, searchTerm, statusFilter]);

  const fetchTimesheets = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTimesheets();
      setTimesheets(data || []);
      setFilteredTimesheets(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load your timesheets.");
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
      setError("Failed to load timesheet details.");
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
      setError("Failed to open timesheet workspace.");
    }
  };

  const handleFormSubmit = async (masterData) => {
    try {
      setActionLoading(true);
      setError("");
      
      if (modalMode === "CREATE") {
        await createTimesheet(masterData);
      } else {
        await updateTimesheet(selectedTimesheet.id, masterData);
      }
      
      setIsFormOpen(false);
      await fetchTimesheets();
    } catch (err) {
      console.error(err);
      setError("Failed to save timesheet master record configuration.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <EmployeeLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Module Header Segment */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-xl shadow-sm p-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Timesheets</h1>
            <p className="mt-1 text-slate-600">Track and manage your professional service entries.</p>
          </div>
          <button
            onClick={handleCreateOpen}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition-colors"
          >
            Create Timesheet
          </button>
        </div>

        {/* Filters */}
        <TimesheetFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-4 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        {/* Main Interface Table Execution */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center text-slate-500 font-medium">
            <div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p>Loading your timesheets...</p>
          </div>
        ) : filteredTimesheets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center text-slate-500">
            No timesheets found matching your filters.
          </div>
        ) : (
          <EmployeeTimesheetsTable
            timesheets={filteredTimesheets}
            onView={handleView}
            onEdit={handleEditOpen}
            onDelete={() => {}} // Disabled until Commit 4
            onSubmit={() => {}} // Disabled until Commit 4
          />
        )}
      </div>

      {/* Read-Only View Modal */}
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

      {/* Write-capable Input Dialog wrapper */}
      <TimesheetModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        timesheet={selectedTimesheet}
        onMasterSubmit={handleFormSubmit}
        loading={actionLoading}
        mode={modalMode}
      />
    </EmployeeLayout>
  );
}

export default MyTimesheets;