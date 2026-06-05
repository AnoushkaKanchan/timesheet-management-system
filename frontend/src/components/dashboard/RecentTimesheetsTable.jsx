function RecentTimesheetsTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">
          Recent Timesheets
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4">
                Employee
              </th>

              <th className="text-left p-4">
                Project
              </th>

              <th className="text-left p-4">
                Hours
              </th>

              <th className="text-left p-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">
                John Smith
              </td>

              <td className="p-4">
                Website Redesign
              </td>

              <td className="p-4">
                40
              </td>

              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Submitted
                </span>
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">
                Priya Patel
              </td>

              <td className="p-4">
                CRM System
              </td>

              <td className="p-4">
                36
              </td>

              <td className="p-4">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  Draft
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTimesheetsTable;