import React from "react";

function ReportsTable({ results, loading }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED": return "bg-green-100 text-green-800 border border-green-200";
      case "PENDING": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "REJECTED": return "bg-red-100 text-red-800 border border-red-200";
      case "SENT_TO_CLIENT": return "bg-blue-100 text-blue-800 border border-blue-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

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
      <div className="bg-white border border-dashed border-slate-200 rounded-xl p-16 text-center text-slate-400 shadow-sm">
        No preview rows match your filter choices. Click "Generate Report" to update.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 tracking-wider">
          <tr>
            <th className="px-6 py-3.5">Employee</th>
            <th className="px-6 py-3.5">Project</th>
            <th className="px-6 py-3.5">Submission Date</th>
            <th className="px-6 py-3.5">Task Description</th>
            <th className="px-6 py-3.5">Status</th>
            <th className="px-6 py-3.5 text-right">Hours</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
          {results.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{row.employee}</td>
              <td className="px-6 py-4 whitespace-nowrap">{row.project}</td>
              <td className="px-6 py-4 whitespace-nowrap text-slate-500">{row.submission_date || "N/A"}</td>
              <td className="px-6 py-4 max-w-xs truncate text-slate-600" title={row.task_description}>
                {row.task_description || <span className="text-slate-300 italic">None</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusBadgeClass(row.status)}`}>
                  {row.status ? row.status.replace(/_/g, " ") : "N/A"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-medium text-slate-900">
                {Number(row.hours_worked).toFixed(2)} hrs
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsTable;