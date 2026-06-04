function TimesheetViewModal({
  isOpen,
  onClose,
  timesheet,
  details,
}) {
  if (!isOpen || !timesheet) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Timesheet Details
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500"
          >
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <strong>Employee:</strong>{" "}
            {timesheet.user}
          </div>

          <div>
            <strong>Status:</strong>{" "}
            {timesheet.status}
          </div>

          <div>
            <strong>Submission Date:</strong>{" "}
            {timesheet.submission_date}
          </div>

          <div>
            <strong>Total Hours:</strong>{" "}
            {timesheet.total_hours}
          </div>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3 text-left">
                Project
              </th>

              <th className="p-3 text-left">
                Hours
              </th>

              <th className="p-3 text-left">
                Task Description
              </th>
            </tr>
          </thead>

          <tbody>
            {details.map((detail) => (
              <tr
                key={detail.id}
                className="border-t"
              >
                <td className="p-3">
                  {detail.project_name}
                </td>

                <td className="p-3">
                  {detail.hours_worked}
                </td>

                <td className="p-3">
                  {detail.task_description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default TimesheetViewModal;