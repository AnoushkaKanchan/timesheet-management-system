import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getReportPreview, exportReportCSV } from "../../services/reportService";
import { getProjects } from "../../services/projectService";
// Note: If you don't have a service to list employees, we fall back to a safe text input or a basic list.
// Assuming getTimesheets can give us a reference or we query master data.

function Reports() {
  const [reportData, setReportData] = useState({
    summary: { total_records: 0, total_hours: "0.00" },
    results: []
  });
  const [projects, setProjects] = useState([]);
  
  // Filter Matrix State
  const [filters, setFilters] = useState({
    project: "ALL",
    status: "ALL",
    start_date: "",
    end_date: "",
    employee: "" // Simple text filter or numeric ID lookup configuration mapping
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFilterMetadata();
    fetchReportPreview();
  }, []);

  const loadFilterMetadata = async () => {
    try {
      const projList = await getProjects();
      setProjects(projList || []);
    } catch (err) {
      console.error("Failed to load options metadata repository.", err);
    }
  };

  const fetchReportPreview = async (currentFilters = filters) => {
    try {
      setLoading(true);
      setError("");
      const data = await getReportPreview(currentFilters);
      setReportData(data || { summary: { total_records: 0, total_hours: "0.00" }, results: [] });
    } catch (err) {
      console.error(err);
      setError("Failed to query real-time data rows from backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    fetchReportPreview(updatedFilters);
  };

  const handleClearFilters = () => {
    const cleared = { project: "ALL", status: "ALL", start_date: "", end_date: "", employee: "" };
    setFilters(cleared);
    fetchReportPreview(cleared);
  };

  const handleExportCSV = async () => {
    try {
      setError("");
      const blobData = await exportReportCSV(filters);
      
      // Handle browser file stream initialization
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Timesheet_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error(err);
      setError("An error occurred during report document stream compilation.");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED": return "bg-green-100 text-green-800 border border-green-200";
      case "PENDING": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "REJECTED": return "bg-red-100 text-red-800 border border-red-200";
      case "SENT_TO_CLIENT": return "bg-blue-100 text-blue-800 border border-blue-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Upper Dashboard Block Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">System Reports Center</h1>
            <p className="text-sm text-slate-500 mt-0.5">Analyze allocations metrics across active entities parameters.</p>
          </div>
          <button
            onClick={handleExportCSV}
            disabled={reportData.results.length === 0}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            Export Filtered CSV
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-600 rounded-xl font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Dynamic Filter Row Parameter Options Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Project</label>
            <select
              value={filters.project}
              onChange={(e) => handleFilterChange("project", e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
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
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
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
              onChange={(e) => handleFilterChange("start_date", e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">End Date</label>
            <input
              type="date"
              value={filters.end_date}
              onChange={(e) => handleFilterChange("end_date", e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={handleClearFilters}
              className="w-full py-1.5 text-sm border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Aggregate KPI Blocks Section Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Total Evaluated Records</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{reportData.summary.total_records} line items</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Cumulative Logged Time</span>
            <div className="text-2xl font-bold text-indigo-600 mt-1">{Number(reportData.summary.total_hours).toFixed(2)} hrs</div>
          </div>
        </div>

        {/* Live Preview Dataset Table Layout */}
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
          {loading ? (
            <div className="p-16 text-center text-slate-400 font-medium">
              <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Calculating live tracking reports view...
            </div>
          ) : reportData.results.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              No real-time report rows matched your active filtering combination selection.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Employee</th>
                  <th className="px-6 py-3.5">Project</th>
                  <th className="px-6 py-3.5">Submission Date</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Hours Worked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                {reportData.results.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{row.employee}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">{row.submission_date || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${getStatusBadgeClass(row.status)}`}>
                        {row.status ? row.status.replace("_", " ") : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right font-mono font-medium text-slate-900">
                      {Number(row.hours_worked).toFixed(2)} hrs
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Reports;