import { useState, useEffect } from "react";

function ProjectForm({ project, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "ACTIVE", // 1. Initial State updated
  });

  useEffect(() => {
    if (project) {
      setFormData({
        project_name: project.project_name || "",
        description: project.description || "",
        start_date: project.start_date || "",
        end_date: project.end_date || "",
        status: project.status || "ACTIVE", // 2. Edit Mode Fallback updated
      });
    } else {
      setFormData({
        project_name: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "ACTIVE", // 3. Reset Form State updated
      });
    }
  }, [project]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.project_name.trim()) {
      alert("Project name is required");
      return;
    }

    // Calendar chronological checking logic guard
    if (
      formData.start_date &&
      formData.end_date &&
      formData.end_date < formData.start_date
    ) {
      alert("End date cannot be before start date");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Project Name *</label>
        <input
          type="text"
          name="project_name"
          placeholder="Project Name"
          value={formData.project_name}
          onChange={handleChange}
          className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          rows="3"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
        {/* 4. Select Options values updated to match DRF Model Choices */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#4F46E5] hover:bg-[#0F172A] text-white px-4 py-2 rounded text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;