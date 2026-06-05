import React from "react";

function TimesheetViewModal({ isOpen, onClose, timesheet, details }) {
  if (!isOpen || !timesheet) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl flex flex-col max-h-[85vh] overflow-hidden border border-slate-200 shadow-xl">

        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">
            Timesheet Verification Summary
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-medium p-1">
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Employee Profile</p>
              <p className="font-semibold text-slate-800 text-sm">{timesheet.user}</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Submission Date</p>
              <p className="font-semibold text-slate-800 text-sm">{timesheet.submission_date}</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Period Hours</p>
              <p className="font-bold text-slate-900 text-sm font-mono">{Number(timesheet.total_hours || 0).toFixed(2)} hrs</p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-50 font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Project Target</th>
                  <th className="px-4 py-3">Task Description Summary</th>
                  <th className="px-4 py-3 text-right">Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                {details.map((detail) => (
                  <tr key={detail.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900">{detail.project_name}</td>
                    <td className="px-4 py-3.5 whitespace-pre-wrap max-w-sm">{detail.task_description}</td>
                    <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-900">
                      {Number(detail.hours_worked).toFixed(2)} hrs
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm transition-all"
          >
            Close Summary
          </button>
        </div>

      </div>
    </div>
  );
}

export default TimesheetViewModal;