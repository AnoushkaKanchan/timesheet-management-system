import ProjectForm from "./ProjectForm";

function ProjectModal({
  isOpen,
  onClose,
  project,
  onSubmit,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">
            {project
              ? "Edit Project"
              : "Create Project"}
          </h2>

          <button onClick={onClose}>
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