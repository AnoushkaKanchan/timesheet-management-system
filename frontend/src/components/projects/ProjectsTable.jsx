function ProjectsTable({ projects }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-4">
              Project Name
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td
                colSpan="3"
                className="p-6 text-center text-slate-500"
              >
                No projects found
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr
                key={project.id}
                className="border-t"
                >
                <td className="p-4">
                    {project.project_name}
                </td>

                <td className="p-4">
                    <span
                    className={`px-3 py-1 rounded-full text-sm ${
                        project.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                    >
                    {project.status}
                    </span>
                </td>

                <td className="p-4 space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded">
                     Edit
                    </button>

                    <button className="px-3 py-1 bg-red-500 text-white rounded">
                    Delete
                    </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsTable;