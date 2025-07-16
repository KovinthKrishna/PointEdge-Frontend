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
import TestingPage from "./pages/TestingPage";
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
  {
    path: "clockout",
    element: <ClockOutPage />,
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
        path: "test",
        element: <TestingPage />,
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
    element: <ProtectedRoute requiredRole="ADMIN" />,
    children: [
      {
        path: "admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "analysis", element: <AnalysisPage /> },
          { path: "inventory", element: <InventoryPage /> },
          {
            path: "discounts",
            children: [
              { index: true, element: <DiscountsPage /> },
              {
                path: "customers",
                element: <DiscountsPage />,
                handle: { showCustomerModal: true },
              },
            ],
          },
          {
            path: "employees",
            element: <EmployeesPage />,
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
