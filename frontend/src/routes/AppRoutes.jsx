import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";

import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";

import Dashboard from "../pages/admin/Dashboard";
import Projects from "../pages/admin/Projects";
import Timesheets from "../pages/admin/Timesheets";
import Reports from "../pages/admin/Reports";

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
        <Route
          path="/login"
          element={<Login />}
        />

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

        <Route
          path="/employee/dashboard"
          element={
            <PrivateRoute>
              <RoleBasedRoute
                allowedRole="Employee"
              >
                <EmployeeDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;