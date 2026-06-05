import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";

import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Projects from "../pages/admin/Projects";
import Timesheets from "../pages/admin/Timesheets";
import Reports from "../pages/admin/Reports";

// Employee Pages
import MyTimesheets from "../pages/employee/MyTimesheets";

function EmployeeDashboard() {
  return (
    <h1 className="p-8 text-3xl font-bold">
      Employee Dashboard
    </h1>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRole="Admin">
                <Dashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRole="Admin">
                <Projects />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/timesheets"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRole="Admin">
                <Timesheets />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRole="Admin">
                <Reports />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />

        {/* Employee Routes */}

        <Route
          path="/employee/dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRole="Employee">
                <EmployeeDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/employee/timesheets"
          element={
            <PrivateRoute>
              <RoleBasedRoute allowedRole="Employee">
                <MyTimesheets />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;