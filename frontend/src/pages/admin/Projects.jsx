import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import ProjectsTable from "../../components/projects/ProjectsTable";

import { getProjects } from "../../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data =
          await getProjects();

        setProjects(data);
      } catch (error) {
        console.error(
          "Failed to fetch projects",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Projects
            </h1>

            <p className="text-slate-500 mt-1">
              Manage company projects
            </p>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium">
            + Create Project
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
          />
        </div>

        {loading ? (
          <div className="bg-white rounded-xl p-6">
            Loading projects...
          </div>
        ) : (
          <ProjectsTable
            projects={projects}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default Projects;