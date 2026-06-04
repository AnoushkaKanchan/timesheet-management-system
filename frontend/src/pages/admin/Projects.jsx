import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "../../layouts/AdminLayout";

import ProjectModal from "../../components/projects/ProjectModal";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";

function Projects() {
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data =
        await getProjects();

      setProjects(data);
    } catch (error) {
      console.error(error);
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

  const handleSubmit = async (
    formData
  ) => {
    try {
      setLoading(true);

      if (selectedProject) {
        await updateProject(
          selectedProject.id,
          formData
        );
      } else {
        await createProject(
          formData
        );
      }

      await fetchProjects();

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Delete this project?"
      );

    if (!confirmed) return;

    try {
      await deleteProject(id);

      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProjects =
    projects.filter((project) =>
      project.project_name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  return (
    <AdminLayout>
      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <button
            onClick={handleCreate}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Create Project
          </button>
        </div>

        <input
          type="text"
          placeholder="Search project..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="border p-2 rounded w-full"
        />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">
                  Name
                </th>
                <th className="p-3 text-left">
                  Status
                </th>
                <th className="p-3 text-left">
                  Start Date
                </th>
                <th className="p-3 text-left">
                  End Date
                </th>
                <th className="p-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.map(
                (project) => (
                  <tr
                    key={project.id}
                    className="border-t"
                  >
                    <td className="p-3">
                      {
                        project.project_name
                      }
                    </td>

                    <td className="p-3">
                      {
                        project.status
                      }
                    </td>

                    <td className="p-3">
                      {
                        project.start_date
                      }
                    </td>

                    <td className="p-3">
                      {
                        project.end_date
                      }
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() =>
                          handleEdit(
                            project
                          )
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            project.id
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <ProjectModal
          isOpen={isModalOpen}
          onClose={() =>
            setIsModalOpen(false)
          }
          project={selectedProject}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
}

export default Projects;