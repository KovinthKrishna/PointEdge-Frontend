import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AnalysisPage from "./pages/Admin/AnalysisPage";
import DiscountsPage from "./pages/Admin/DiscountsPage";
import EmployeesPage from "./pages/Admin/EmployeesPage";
import InventoryPage from "./pages/Admin/InventoryPage";
import ErrorPage from "./pages/ErrorPage";
import SalesDashboard from "./pages/SalesDashboard";
import Login from "./pages/Login";

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
      { path: "discounts", element: <DiscountsPage /> },
      { path: "employees", element: <EmployeesPage /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
