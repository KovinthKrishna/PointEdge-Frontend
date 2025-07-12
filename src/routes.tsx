import { createBrowserRouter } from "react-router-dom";
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
import EmployeeDashboardPage from "./components/Admin/EmployeesPage/EmployeeDashboardPage";
import EmployeeAttendancePage from "./components/Admin/EmployeesPage/EmployeeAttendancePage";
import TopPerformersPage from "./components/Admin/EmployeesPage/TopPerformersPage";
import ShiftReport1Page from "./components/Admin/EmployeesPage/ShiftReport1Page";
import ClockInPage from "./components/Admin/ClockInOutPAges/ClockInPage";
import ClockOutPage from "./components/Admin/ClockInOutPAges/ClockOutPage";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    index: true,
    element: <SalesDashboard />,
    errorElement: <ErrorPage />,
  },
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
            handle: {
              showCustomerModal: true,
            },
          },
        ],
      },
      {
        path: "employees",
        element: <EmployeesPage />,
        children: [
          { index: true, element: <EmployeeDashboardPage /> },
          { path: "attendance", element: <EmployeeAttendancePage /> },
          { path: "top-performers", element: <TopPerformersPage /> },
          { path: "shift-reports", element: <ShiftReport1Page /> },
        ],
      },
    ],
  },
  {
    path: "return-refund",
    element: <ReturnRefundPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "forgotpw",
    element: <ForgotPW />,
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

  //temperory path adding to check the component
  {
    path: "test",
    element: <TestingPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
