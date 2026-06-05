import React from "react";

function TimesheetFilters({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center">
      <div className="w-full max-w-md">
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Filter by Submission Date
        </label>

        <input
          type="date"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
        />
      </div>
    </div>
  );
}

export default TimesheetFilters;