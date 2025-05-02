import { createBrowserRouter, Navigate } from "react-router-dom"
import AdminDashboard from "./pages/AdminDashboard"
import AdminLayout from "./pages/AdminLayout"
import AnalysisPage from "./pages/AnalysisPage"
import DiscountsPage from "./pages/DiscountsPage"
import EmployeesPage from "./pages/EmployeesPage"
import ErrorPage from "./pages/ErrorPage"
import InventoryPage from "./pages/InventoryPage"
import SalesDashboard from "./pages/SalesDashboard"
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage"
import EmployeeAttendancePage from "./pages/EmployeeAttendancePage"
import SalesTrackingPage from "./pages/SalesTrackingPage"
import TopPerformersPage from "./pages/TopPerformersPage"
import ShiftReportsPage from "./pages/ShiftReport1Page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SalesDashboard />,
    errorElement: <ErrorPage />,
  },
  // Direct access to employees section
  {
    path: "employees",
    element: <Navigate to="/admin/employees" replace />
  },
  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "analysis", element: <AnalysisPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "discounts", element: <DiscountsPage /> },
      { 
        path: "employees", 
        element: <EmployeesPage />,
        children: [
          { index: true, element: <EmployeeDashboardPage /> },
          { path: "attendance", element: <EmployeeAttendancePage /> },
          { path: "sales-tracking", element: <SalesTrackingPage /> },
          { path: "top-performers", element: <TopPerformersPage /> },
          { path: "shift-reports", element: <ShiftReportsPage /> },
        ],
      },
    ],
  },
])

export default router;