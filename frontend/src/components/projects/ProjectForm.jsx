import { useState, useEffect } from "react";

function ProjectForm({
  project,
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "Active",
  });

  useEffect(() => {
        if (project) {
            setFormData({
                project_name: project.project_name || "",
                description: project.description || "",
                start_date: project.start_date || "",
                end_date: project.end_date || "",
                status: project.status || "Active",
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
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        name="project_name"
        placeholder="Project Name"
        value={formData.project_name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="date"
        name="end_date"
        value={formData.end_date}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="Active">
          Active
        </option>
        <option value="Completed">
          Completed
        </option>
        <option value="On Hold">
          On Hold
        </option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        {loading
          ? "Saving..."
          : project
          ? "Update Project"
          : "Create Project"}
      </button>
    </form>
  );
}

export default ProjectForm;