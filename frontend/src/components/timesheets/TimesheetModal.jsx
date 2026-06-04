import React from "react";
import TimesheetForm from "./TimesheetForm";

function TimesheetModal({ isOpen, onClose, timesheet, onMasterSubmit, loading, mode }) {
  if (!isOpen) return null;

  const isEditMode = mode === "EDIT";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl relative flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">
            {isEditMode ? "Edit Timesheet Master" : "New Timesheet Log"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Modal Content Form Body */}
        <div className="space-y-4">
          <TimesheetForm
            timesheet={timesheet}
            onSubmit={onMasterSubmit}
            loading={loading}
            mode={mode}
          />

          {!isEditMode && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-700 mt-2">
              ℹ️ <strong>Note:</strong> Create this timesheet first. Once saved, click <strong>Edit</strong> on the dashboard to add project hour entries.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimesheetModal;