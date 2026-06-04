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
  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [selectedTimesheet, setSelectedTimesheet] =
  useState(null);

const [timesheetDetails, setTimesheetDetails] =
  useState([]);

const [isModalOpen, setIsModalOpen] =
  useState(false);

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

    if (statusFilter) {
      filtered = filtered.filter(
        (timesheet) =>
          timesheet.status === statusFilter
      );
    }

    setFilteredTimesheets(filtered);
  }, [timesheets, searchTerm, statusFilter]);

  const fetchTimesheets = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTimesheets();

      setTimesheets(data);
      setFilteredTimesheets(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load timesheets.");
    } finally {
      setLoading(false);
    }
  };
  const handleView = async (timesheet) => {
  try {
    const details =
      await getTimesheetDetails(
        timesheet.id
      );

    setSelectedTimesheet(
      timesheet
    );

    setTimesheetDetails(
      details
    );

    setIsModalOpen(true);

  } catch (error) {
    console.error(error);
  }
};

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
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border border-slate-300 rounded-lg px-4 py-2"
            >
              <option value="">
                All Status
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="APPROVED">
                Approved
              </option>

              <option value="REJECTED">
                Rejected
              </option>

              <option value="SENT_TO_CLIENT">
                Sent To Client
              </option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            Loading timesheets...
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-4">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          filteredTimesheets.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              No timesheets found.
            </div>
          )}

        {!loading &&
          !error &&
          filteredTimesheets.length > 0 && (
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