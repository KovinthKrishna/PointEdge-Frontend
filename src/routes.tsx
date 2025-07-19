import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AnalysisPage from "./pages/Admin/AnalysisPage";
import DiscountsPage from "./pages/Admin/DiscountsPage";
import EmployeesPage from "./pages/Admin/EmployeesPage";
import InventoryPage from "./pages/Admin/InventoryPage";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import ForgotPW from "./pages/ForgotPW";
import ReturnRefundPage from "./pages/ReturnAndRefundpage/ReturnAndRefundpage";
import SalesDashboard from "./pages/SalesDashboard";
import ClockOutPage from "./components/Admin/ClockInOutPAges/ClockOutPage";
import ClockInPage from "./components/Admin/ClockInOutPAges/ClockInPage";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import ResetPW from "./pages/ResetPW";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // Public routes: accessible without authentication

  {
    path: "login",
    index: true,
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPW />,
    errorElement: <ErrorPage />,
  },
  {
    path: "resetpw",
    element: <ResetPW />,
    errorElement: <ErrorPage />,
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
    errorElement: <ErrorPage />,
  },

  // Protected route: for all logged-in users

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <SalesDashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "return-refund",
        element: <ReturnRefundPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: "clock-in",
        element: <ClockInPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "clock-out",
        element: <ClockOutPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },

  // Admin-only protected route

  {
    path: "admin",
    element: (
      // This wrapper protects all /admin routes: must be authenticated
      <ProtectedRoute />
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AdminLayout />, // layout for all admin pages
        children: [
          // Admin only routes
          {
            element: <ProtectedRoute requiredRole="ADMIN" />,
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: "analysis", element: <AnalysisPage /> },
              { path: "inventory", element: <InventoryPage /> },
              { path: "discounts", index: true, element: <DiscountsPage /> },
              { path: "employees", element: <EmployeesPage /> },
            ],
          },

          // discounts/customers accessible by admin and salesperson only
          {
            path: "discounts/customers",
            element: <ProtectedRoute allowForUserOnly={true} />,
            children: [
              {
                index: true,
                element: <DiscountsPage />,
                handle: { showCustomerModal: true },
              },
            ],
          },
        ],
      },
    ],
  },

  // Catch-all route for undefined paths
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;
