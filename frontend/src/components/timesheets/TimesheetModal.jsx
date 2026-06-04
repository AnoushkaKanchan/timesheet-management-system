import React from "react";
import TimesheetForm from "./TimesheetForm";
import TimesheetDetailForm from "./TimesheetDetailForm";
import TimesheetDetailsTable from "./TimesheetDetailsTable";

function TimesheetModal({ 
  isOpen, 
  onClose, 
  timesheet, 
  details, 
  onMasterSubmit, 
  onAddDetail, 
  onDeleteDetail, 
  loading, 
  mode 
}) {
  if (!isOpen) return null;

  const isEditMode = mode === "EDIT";
  const isLocked = timesheet?.is_locked === true;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col p-6 shadow-xl relative animate-fadeIn">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            {isEditMode ? "Edit Timesheet Allocation Workspace" : "Create New Timesheet"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scroll Body Space */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1">
          
          {/* Master Section Form mapping */}
          <div>
            <TimesheetForm
              timesheet={timesheet}
              onSubmit={onMasterSubmit}
              loading={loading}
              mode={mode}
            />
          </div>

          {/* Details form sections - ONLY active in edit context paths */}
          {isEditMode && (
            <div className="border-t border-slate-200 pt-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Hourly Distribution Items
                </h3>
                {isLocked && (
                  <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100 font-medium">
                    🔒 Locked - Read Only
                  </span>
                )}
              </div>

              {/* Check 3 implementation compliance logic */}
              {!isLocked && <TimesheetDetailForm onAdd={onAddDetail} />}

              <TimesheetDetailsTable
                details={details || []}
                isLocked={isLocked}
                onDeleteDetail={onDeleteDetail}
              />
            </div>
          )}

          {!isEditMode && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 text-xs text-blue-700">
              ℹ️ <strong>Getting Started:</strong> Initialize this timesheet master record first. Once saved, you can immediately select <strong>Edit</strong> on your dashboard to append granular project hour records.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimesheetModal;