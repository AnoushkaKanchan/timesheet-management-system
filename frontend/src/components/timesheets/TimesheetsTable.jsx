import React from "react";

function TimesheetsTable({ timesheets, onView }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
      <table className="w-full text-left text-sm divide-y divide-slate-200">
        <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 tracking-wider">
          <tr>
            <th className="p-4">Employee</th>
            <th className="p-4">Submission Date</th>
            <th className="p-4">Hours Logged</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
          {timesheets.map((timesheet) => (
            <tr key={timesheet.id} className="hover:bg-slate-50/40 transition-colors">
              <td className="p-4 font-medium text-slate-900">{timesheet.user}</td>

              <td className="p-4 text-slate-500">
                {new Date(timesheet.submission_date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>

              <td className="p-4 font-mono font-bold text-slate-800">
                {Number(timesheet.total_hours || 0).toFixed(2)} hrs
              </td>

              <td className="p-4 text-center">
                <button
                  onClick={() => onView(timesheet)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimesheetsTable;