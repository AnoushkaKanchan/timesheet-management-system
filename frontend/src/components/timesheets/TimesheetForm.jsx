import React, { useState, useEffect } from "react";

function TimesheetForm({ timesheet, onSubmit, loading, mode }) {
  const [formData, setFormData] = useState({
    submission_date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (timesheet && mode === "EDIT") {
      setFormData({
        submission_date: timesheet.submission_date || "",
      });
    }
  }, [timesheet, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Submission Date
        </label>
        <input
          type="date"
          required
          value={formData.submission_date}
          onChange={(e) => setFormData({ ...formData, submission_date: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow disabled:opacity-50 font-semibold transition-all"
        >
          {loading ? "Saving Master Parameters..." : "Save Master Entry"}
        </button>
      </div>
    </form>
  );
}

export default TimesheetForm;