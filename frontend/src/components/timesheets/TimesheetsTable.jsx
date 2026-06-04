function getStatusClasses(status) {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-700";

    case "REJECTED":
      return "bg-red-100 text-red-700";

    case "PENDING":
      return "bg-yellow-100 text-yellow-700";

    case "SENT_TO_CLIENT":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatStatus(status) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function TimesheetsTable({timesheets,onView}) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-4">Employee</th>
            <th className="text-left p-4">Submission Date</th>
            <th className="text-left p-4">Hours</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {timesheets.map((timesheet) => (
            <tr key={timesheet.id} className="border-t">
              <td className="p-4">{timesheet.user}</td>

              <td className="p-4">
                {new Date(
                  timesheet.submission_date
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                {timesheet.total_hours}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusClasses(
                    timesheet.status
                  )}`}
                >
                  {formatStatus(timesheet.status)}
                </span>
              </td>

              <td className="p-4">
  <button
    onClick={() => onView(timesheet)}
    className="px-3 py-1 bg-indigo-600 text-white rounded-lg"
  >
    View
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimesheetsTable;