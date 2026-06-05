import { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ReportFilters from "../../components/reports/ReportFilters";
import ReportSummaryCards from "../../components/reports/ReportSummaryCards";
import ReportsTable from "../../components/reports/ReportsTable";

import { getReportPreview, exportReportCSV } from "../../services/reportService";
import { getProjects } from "../../services/projectService";

function Reports() {
  const [projects, setProjects] = useState([]);
  const [reportData, setReportData] = useState({
    summary: { total_records: 0, total_hours: "0.00" },
    results: []
  });

  const [filters, setFilters] = useState({
    project: "ALL",
    status: "ALL",
    start_date: "",
    end_date: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFilterMetadata();
    // Fetch initial report overview matching defaults on initial view mount
    handleFetchReport(filters);
  }, []);

  const loadFilterMetadata = async () => {
    try {
      const projList = await getProjects();
      setProjects(projList || []);
    } catch (err) {
      console.error("Failed to load options metadata repository.", err);
    }
  };

  const handleFetchReport = async (activeFilters = filters) => {
    try {
      setLoading(true);
      setError("");
      const data = await getReportPreview(activeFilters);
      setReportData(data || { summary: { total_records: 0, total_hours: "0.00" }, results: [] });
    } catch (err) {
      console.error(err);
      setError("Failed to query real-time data rows from backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    const cleared = { project: "ALL", status: "ALL", start_date: "", end_date: "" };
    setFilters(cleared);
    handleFetchReport(cleared);
  };

  const handleExportCSV = async () => {
    try {
      setError("");
      const blobData = await exportReportCSV(filters);
      
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Filtered_Timesheet_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error(err);
      setError("An error occurred during report document stream compilation.");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Main Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">System Reports Center</h1>
            <p className="text-sm text-slate-500 mt-0.5">Analyze and preview structural logged time metrics tables.</p>
          </div>
          <button
            onClick={handleExportCSV}
            disabled={reportData.results.length === 0}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            Export Filtered CSV
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-600 rounded-xl font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* Thin component layer orchestrations */}
        <ReportFilters
          filters={filters}
          setFilters={setFilters}
          projects={projects}
          onGenerate={() => handleFetchReport(filters)}
          onReset={handleResetFilters}
        />

        <ReportSummaryCards summary={reportData.summary} />

        <ReportsTable results={reportData.results} loading={loading} />
      </div>
    </AdminLayout>
  );
}

export default Reports;