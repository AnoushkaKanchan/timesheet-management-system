import React from "react";

function EmployeeTimesheetsTable({ timesheets, onView, onEdit, onDelete, onSubmit }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED": return "bg-green-100 text-green-800";
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      case "REJECTED": return "bg-red-100 text-red-800";
      case "SENT_TO_CLIENT": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-600 tracking-wider">
          <tr>
            <th className="px-6 py-3">Submission Date</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Total Hours</th>
            <th className="px-6 py-3">Locked</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700">
          {timesheets.map((timesheet) => (
            <tr key={timesheet.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {timesheet.submission_date || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(timesheet.status)}`}>
                  {timesheet.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-mono">
                {Number(timesheet.total_hours || 0).toFixed(2)} hrs
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {timesheet.is_locked ? (
                  <span className="text-red-600 flex items-center gap-1 text-xs font-medium">🔒 Yes</span>
                ) : (
                  <span className="text-green-600 flex items-center gap-1 text-xs font-medium">🔓 No</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-4">
                <button
                  onClick={() => onView(timesheet)}
                  className="text-blue-600 hover:text-blue-900 font-medium transition-colors"
                >
                  View
                </button>
                {!timesheet.is_locked && (
                  <button
                    onClick={() => onEdit(timesheet)}
                    className="text-amber-600 hover:text-amber-900 font-medium transition-colors"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTimesheetsTable;