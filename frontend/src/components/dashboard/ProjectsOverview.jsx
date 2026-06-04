function ProjectsOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold">
          Website Redesign
        </h3>

        <p className="text-sm text-slate-500 mt-2">
          Active Project
        </p>

        <div className="mt-4 h-2 bg-slate-200 rounded-full">
          <div className="h-2 w-3/4 bg-indigo-600 rounded-full"></div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold">
          CRM System
        </h3>

        <p className="text-sm text-slate-500 mt-2">
          Active Project
        </p>

        <div className="mt-4 h-2 bg-slate-200 rounded-full">
          <div className="h-2 w-1/2 bg-indigo-600 rounded-full"></div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold">
          Mobile App
        </h3>

        <p className="text-sm text-slate-500 mt-2">
          Active Project
        </p>

        <div className="mt-4 h-2 bg-slate-200 rounded-full">
          <div className="h-2 w-2/3 bg-indigo-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsOverview;