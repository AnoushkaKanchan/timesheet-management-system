import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ProjectsTable from "../../components/projects/ProjectsTable";
import ProjectModal from "../../components/projects/ProjectModal";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // PRODUCTION REFINEMENT: Dynamic DRF Error Parser Helper
  const getErrorMessage = (error) => {
    const data = error.response?.data;

    if (typeof data === "string") return data;
    if (data?.detail) return data.detail;

    const firstField = Object.keys(data || {})[0];
    if (firstField) {
      const fieldError = data[firstField];
      return `${firstField}: ${Array.isArray(fieldError) ? fieldError[0] : fieldError}`;
    }

    return "Something went wrong";
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const data = await getProjects();
      setProjects(data || []);
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleCreate = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      if (selectedProject) {
        await updateProject(selectedProject.id, formData);
      } else {
        await createProject(formData);
      }

      await fetchProjects();

      setSelectedProject(null);
      setIsModalOpen(false);
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  const handleModalClose = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  // EXACT REPLACEMENT: Using the short-circuit OR operator sequence to handle empty backend rows
  const filteredProjects = projects.filter((project) =>
    (project.project_name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loadingProjects) {
    return (
      <AdminLayout>
        <div className="text-center py-10 text-slate-500 font-medium">
          Loading projects...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto w-full">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">Projects</h1>
            <p className="text-xs text-slate-400 mt-0.5">Manage and monitor core workspace parameters.</p>
          </div>

          <button
            onClick={handleCreate}
            className="bg-[#4F46E5] hover:bg-[#0F172A] text-white px-4 py-2 rounded text-sm font-semibold shadow-sm transition-colors"
          >
            Create Project
          </button>
        </div>

        <input
          type="text"
          placeholder="Search project by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-slate-300 p-2.5 rounded-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
        />

        <ProjectsTable
          projects={filteredProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          project={selectedProject}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
}

export default Projects;