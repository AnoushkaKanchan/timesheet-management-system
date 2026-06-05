import React from "react";

function TimesheetFilters({ searchTerm, setSearchTerm }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center">
      <div className="relative w-full max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none text-sm">
          📅
        </span>
        <input
          type="text"
          placeholder="Search items by matching execution date (YYYY-MM-DD)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all"
        />
      </div>
    </div>
  );
}

export default TimesheetFilters;