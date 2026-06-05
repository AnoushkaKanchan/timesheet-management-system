import React from "react";

function DashboardCard({ title, value, icon, colorClass = "text-indigo-600" }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
      <div className="space-y-1">
        <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
          {title}
        </p>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {typeof value === "number" || typeof value === "string" ? value : "0"}
        </h2>
      </div>
      {icon && (
        <div className={`text-2xl p-3 bg-slate-50 border border-slate-100 rounded-xl ${colorClass}`}>
          {icon}
        </div>
      )}
    </div>
  );
}

export default DashboardCard;