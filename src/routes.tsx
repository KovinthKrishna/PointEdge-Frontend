import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./pages/AdminLayout";
import AnalysisPage from "./pages/AnalysisPage";
import DiscountsPage from "./pages/DiscountsPage";
import EmployeesPage from "./pages/EmployeesPage";
import ErrorPage from "./pages/ErrorPage";
import InventoryPage from "./pages/InventoryPage";
import SalesDashboard from "./pages/SalesDashboard";

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
]);

export default router;
