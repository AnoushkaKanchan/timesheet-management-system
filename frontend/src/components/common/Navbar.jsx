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