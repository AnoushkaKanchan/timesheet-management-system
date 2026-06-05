import React from "react";

function ReportsTable({ results, loading }) {
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-16 text-center text-slate-400 font-medium shadow-sm">
        <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Compiling active tracking indexes...
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="bg-white border border-dashed border-slate-200 rounded-xl p-16 text-center text-slate-400 font-medium shadow-sm">
        No active timesheet allocations found matching the targeted search bounds.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 tracking-wider">
          <tr>
            <th className="px-6 py-3.5">Employee</th>
            <th className="px-6 py-3.5">Project</th>
            <th className="px-6 py-3.5">Submission Date</th>
            <th className="px-6 py-3.5">Task Description</th>
            <th className="px-6 py-3.5 text-right">Hours</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
          {results.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{row.employee}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.project}</td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                {row.submission_date ? new Date(row.submission_date).toLocaleDateString() : "N/A"}
              </td>
              <td className="px-6 py-4 max-w-xs truncate text-slate-600" title={row.task_description}>
                {row.task_description || <span className="text-slate-300 italic">None</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-bold text-slate-900">
                {Number(row.hours_worked || 0).toFixed(2)} hrs
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsTable;