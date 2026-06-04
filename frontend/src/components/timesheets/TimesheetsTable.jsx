function TimesheetsTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-4">
              Employee
            </th>

            <th className="text-left p-4">
              Submission Date
            </th>

            <th className="text-left p-4">
              Hours
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t">
            <td className="p-4">
              John Smith
            </td>

            <td className="p-4">
              03 Jun 2026
            </td>

            <td className="p-4">
              40
            </td>

            <td className="p-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Submitted
              </span>
            </td>

            <td className="p-4">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg">
                View
              </button>
            </td>
          </tr>

          <tr className="border-t">
            <td className="p-4">
              Priya Patel
            </td>

            <td className="p-4">
              02 Jun 2026
            </td>

            <td className="p-4">
              36
            </td>

            <td className="p-4">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                Draft
              </span>
            </td>

            <td className="p-4">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg">
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TimesheetsTable;