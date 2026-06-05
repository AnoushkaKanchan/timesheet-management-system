import React from "react";

function ReportSummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Total Line Items</span>
        <div className="text-2xl font-bold text-slate-900 mt-1">
          {summary?.total_records || 0} rows evaluated
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Cumulative Logged Time</span>
        <div className="text-2xl font-bold text-indigo-600 mt-1">
          {Number(summary?.total_hours || 0).toFixed(2)} hrs
        </div>
      </div>
    </div>
  );
}

export default ReportSummaryCards;