import React from "react";

function ReportFilters({ filters, setFilters, projects, onGenerate, onReset }) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Project</label>
        <select
          value={filters.project}
          onChange={(e) => handleChange("project", e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="ALL">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.project_name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
          <option value="SENT_TO_CLIENT">Sent To Client</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Start Date</label>
        <input
          type="date"
          value={filters.start_date}
          onChange={(e) => handleChange("start_date", e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">End Date</label>
        <input
          type="date"
          value={filters.end_date}
          onChange={(e) => handleChange("end_date", e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-end gap-2 pt-4 lg:pt-0">
        <button
          onClick={onGenerate}
          className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
        >
          Generate Report
        </button>
        <button
          onClick={onReset}
          className="px-3 py-2 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-sm font-medium rounded-lg transition-colors"
          title="Reset All Filters"
        >
          ↺
        </button>
      </div>
    </div>
  );
}

export default ReportFilters;