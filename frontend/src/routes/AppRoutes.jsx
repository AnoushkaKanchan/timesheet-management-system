import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";

import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";

function AdminDashboard() {
  return (
    <h1 className="p-8 text-3xl font-bold">
      Admin Dashboard
    </h1>
  );
}

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
              <RoleBasedRoute
                allowedRole="Admin"
              >
                <AdminDashboard />
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