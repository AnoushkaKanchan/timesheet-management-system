import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <img
          src="/ODT.jpg"
          alt="Orange Data Tech"
          className="h-10 w-auto"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative text-slate-500 hover:text-slate-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9a6 6 0 10-12 0v.75a8.967 8.967 0 01-2.312 6.022 23.848 23.848 0 005.454 1.31m5.715 0a24.255 24.255 0 01-5.715 0m5.715 0a3 3 0 11-5.715 0"
            />
          </svg>

          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
        </button>

        {/* User */}
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">
            {user?.email}
          </p>

          <p className="text-xs text-slate-500">
            {user?.role}
          </p>
        </div>

        {/* Avatar */}
        <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
          {user?.email?.charAt(0)?.toUpperCase()}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;