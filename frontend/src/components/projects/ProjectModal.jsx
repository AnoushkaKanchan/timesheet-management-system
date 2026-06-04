import ProjectForm from "./ProjectForm";

function ProjectModal({ isOpen, onClose, project, onSubmit, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl border border-slate-200">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
          <h2 className="text-lg font-bold text-[#0F172A]">
            {project ? "Edit Project Details" : "Create New Project"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded hover:bg-slate-100 w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <ProjectForm
          project={project}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ProjectModal;