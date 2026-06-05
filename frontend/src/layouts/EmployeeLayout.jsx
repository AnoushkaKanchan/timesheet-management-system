import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

function EmployeeLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default EmployeeLayout;