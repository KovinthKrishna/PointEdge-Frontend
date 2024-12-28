import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./pages/AdminLayout";
import ErrorPage from "./pages/ErrorPage";
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
    children: [{ index: true, element: <AdminDashboard /> }],
  },
]);

export default router;
