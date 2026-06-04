function ProjectsTable({ projects, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[#334155] font-semibold border-b border-slate-200">
            <tr>
              <th scope="col" className="p-4 font-semibold">Project Name</th>
              <th scope="col" className="p-4 font-semibold">Duration</th>
              <th scope="col" className="p-4 font-semibold">Status</th>
              <th scope="col" className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {projects.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-slate-500 font-medium">
                  No projects found matching criteria.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-medium text-[#0F172A]">
                    <div className="flex flex-col">
                      <span>{project.project_name}</span>
                      {project.description && (
                        <span className="text-xs text-slate-400 font-normal max-w-xs truncate">
                          {project.description}
                        </span>
                      )}
                    </div>
                  </td>
                  
                  {/* UI REFINEMENT: Clean nullish coalescing layout using dash range separators */}
                  <td className="p-4 text-xs font-mono text-slate-500">
                    {project.start_date ?? "N/A"} - {project.end_date ?? "N/A"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                        project.status === "Active"
                          ? "bg-emerald-50 text-[#22C55E] ring-emerald-600/20"
                          : project.status === "Completed"
                          ? "bg-blue-50 text-blue-700 ring-blue-700/10"
                          : "bg-amber-50 text-[#F59E0B] ring-amber-600/20"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="p-4 space-x-2 text-right">
                    <button 
                      onClick={() => onEdit(project)}
                      className="px-3 py-1 text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#0F172A] rounded shadow-sm transition-colors"
                    >
                      Edit
                    </button>

                    <button 
                      onClick={() => onDelete(project.id)}
                      className="px-3 py-1 text-xs font-semibold text-white bg-[#EF4444] hover:bg-red-700 rounded shadow-sm transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsTable;