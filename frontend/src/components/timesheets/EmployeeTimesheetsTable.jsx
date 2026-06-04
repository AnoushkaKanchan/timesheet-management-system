import React from "react";

function EmployeeTimesheetsTable({ timesheets, onView, onEdit, onDelete, onSubmit }) {
  // Status styling mapper with Improvement 3 mapped to blue color
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800 border border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border border-red-200";
      case "SENT_TO_CLIENT":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "N/A";
    return status.replace(/_/g, " ");
  };

  return (
    <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 tracking-wider">
          <tr>
            <th className="px-6 py-3.5">Submission Date</th>
            <th className="px-6 py-3.5">Status</th>
            <th className="px-6 py-3.5">Total Hours</th>
            <th className="px-6 py-3.5">Locked Status</th>
            <th className="px-6 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
          {timesheets.map((timesheet) => {
            const isLocked = timesheet.is_locked === true;
            
            return (
              <tr key={timesheet.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                  {timesheet.submission_date || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusBadgeClass(timesheet.status)}`}>
                    {formatStatus(timesheet.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-mono font-medium text-slate-900">
                  {Number(timesheet.total_hours || 0).toFixed(2)} hrs
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isLocked ? (
                    <span className="text-red-600 flex items-center gap-1.5 text-xs font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-100 w-fit">
                      Yes
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center gap-1.5 text-xs font-semibold bg-green-50 px-2 py-0.5 rounded border border-green-100 w-fit">
                      No
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold space-x-3">
                  <button
                    onClick={() => onView(timesheet)}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    View
                  </button>
                  
                  {!isLocked && (
                    <>
                      <button
                        onClick={() => onEdit(timesheet)}
                        className="text-amber-600 hover:text-amber-900 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(timesheet.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => onSubmit(timesheet.id)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors"
                      >
                        Submit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTimesheetsTable;