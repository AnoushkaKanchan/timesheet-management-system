import React from "react";

function MonthSelector({ selectedMonth, selectableMonths, onMonthChange }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Month-Wise Admin Metrics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Isolated log analytics parameters scoped specifically to selected calendar ranges.</p>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <label htmlFor="dashboard-month-picker" className="text-xs uppercase font-bold text-slate-400 whitespace-nowrap">
          Statement Period:
        </label>
        <select
          id="dashboard-month-picker"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="w-full sm:w-56 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
        >
          {selectableMonths.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default MonthSelector;