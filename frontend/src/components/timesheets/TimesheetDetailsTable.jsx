import React from "react";

function TimesheetDetailsTable({ details, isLocked, onDeleteDetail }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
        <thead className="bg-slate-50 font-semibold text-slate-500 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">Project</th>
            <th className="px-4 py-3">Hours</th>
            <th className="px-4 py-3">Task Description</th>
            {!isLocked && <th className="px-4 py-3 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-slate-700">
          {details.length === 0 ? (
            <tr>
              <td colSpan={isLocked ? 3 : 4} className="text-center py-8 text-slate-400 italic bg-white">
                No active detailed task entries allocated to this sheet yet.
              </td>
            </tr>
          ) : (
            details.map((detail) => (
              <tr key={detail.id} className="hover:bg-slate-50/50 transition-colors">
                {/* Check 2 rule: display explicit name string value instead of raw object keys */}
                <td className="px-4 py-3 font-medium text-slate-900">
                  {detail.project_name || "Unknown Assignment"}
                </td>
                <td className="px-4 py-3 font-mono font-medium">
                  {Number(detail.hours_worked).toFixed(2)} hrs
                </td>
                <td className="px-4 py-3 text-slate-500 max-w-xs truncate">
                  {detail.task_description}
                </td>
                {!isLocked && (
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to remove this detail row entry?")) {
                          onDeleteDetail(detail.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-900 font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TimesheetDetailsTable;