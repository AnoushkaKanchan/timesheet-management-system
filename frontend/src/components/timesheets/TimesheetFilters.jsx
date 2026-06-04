import React from "react";

function TimesheetFilters({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
      {/* Search Bar */}
      <div className="flex-1">
        <label htmlFor="search-date" className="sr-only">Search Date</label>
        <input
          id="search-date"
          type="text"
          placeholder="Search by date (YYYY-MM-DD)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Dropdown Status Selector */}
      <div className="w-full sm:w-48">
        <label htmlFor="status-select" className="sr-only">Filter by Status</label>
        <select
          id="status-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
          <option value="SENT_TO_CLIENT">SENT_TO_CLIENT</option>
        </select>
      </div>
    </div>
  );
}

export default TimesheetFilters;