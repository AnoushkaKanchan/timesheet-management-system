import React, { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";

function TimesheetDetailForm({ onAdd }) {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  
  const [formData, setFormData] = useState({
    project: "",
    hours_worked: "",
    task_description: ""
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const res = await apiClient.get(API_ENDPOINTS.PROJECTS);
        // Assumes non-paginated plain array payload structure per Check 2
        setProjects(res.data || []);
      } catch (err) {
        console.error("Failed to load project parameters within subform:", err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.project || !formData.hours_worked || !formData.task_description) return;
    
    onAdd({
      project: parseInt(formData.project, 10),
      hours_worked: formData.hours_worked,
      task_description: formData.task_description
    });

    setFormData({ project: "", hours_worked: "", task_description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 sm:space-y-0 sm:flex sm:items-end sm:gap-3">
      <div className="flex-1">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Project
        </label>
        <select
          required
          value={formData.project}
          onChange={(e) => setFormData({ ...formData, project: e.target.value })}
          className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-1 focus:ring-indigo-500 focus:outline-none cursor-pointer"
        >
          <option value="">{loadingProjects ? "Loading options..." : "Select Target Project..."}</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.project_name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:w-28">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Hours
        </label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          max="24"
          required
          placeholder="0.00"
          value={formData.hours_worked}
          onChange={(e) => setFormData({ ...formData, hours_worked: e.target.value })}
          className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none bg-white font-mono"
        />
      </div>

      <div className="flex-[2]">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          Task Description
        </label>
        <input
          type="text"
          required
          placeholder="What activities did you complete?"
          value={formData.task_description}
          onChange={(e) => setFormData({ ...formData, task_description: e.target.value })}
          className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none bg-white"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          Add Entry
        </button>
      </div>
    </form>
  );
}

export default TimesheetDetailForm;