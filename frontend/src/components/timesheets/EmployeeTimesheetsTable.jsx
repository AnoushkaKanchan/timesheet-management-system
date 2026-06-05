import React from "react";

function EmployeeTimesheetsTable({ timesheets, onView, onEdit, onDelete, onSubmit }) {
  return (
    <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 tracking-wider">
          <tr>
            <th className="px-6 py-4">Submission Date</th>
            <th className="px-6 py-4">Hours Logged</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
          {timesheets.map((timesheet) => {
            const isLocked = timesheet.is_locked === true;
            return (
              <tr key={timesheet.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {new Date(timesheet.submission_date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 font-mono font-bold text-slate-800">
                  {Number(timesheet.total_hours || 0).toFixed(2)} hrs
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isLocked ? (
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      🔒 Submitted
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      ✏️ Draft
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-semibold space-x-3">
                  <button
                    onClick={() => onView(timesheet)}
                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
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
                        className="text-emerald-600 hover:text-emerald-900 transition-colors"
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