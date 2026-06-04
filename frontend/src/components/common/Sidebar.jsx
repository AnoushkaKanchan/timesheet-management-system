import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const adminLinks = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      label: "Projects",
      path: "/admin/projects",
    },
    {
      label: "Timesheets",
      path: "/admin/timesheets",
    },
    {
      label: "Reports",
      path: "/admin/reports",
    },
  ];

  if (user?.role !== "Admin") {
    return null;
  }

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col bg-slate-900 border-r border-slate-800 min-h-screen">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center justify-center py-4">
            <img
                src="/ODT.jpg"
                alt="Orange Data Tech"
                className="h-12 w-auto"
            />
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {adminLinks.map((link) => {
            const isActive =
              location.pathname === link.path;

            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <p className="text-xs text-slate-500">
          Timesheet Management System
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;