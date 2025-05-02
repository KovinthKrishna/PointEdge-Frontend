import DashboardFilters from "../../components/Admin/AdminDashboard/DashboardFilters";
import DashboardTop from "../../components/Admin/AdminDashboard/DashboardTop";
import ProductList from "../../components/Admin/AdminDashboard/ProductList";

const AdminDashboard = () => {
  return (
    <>
      <DashboardTop />
      <DashboardFilters />
      <ProductList />
    </>
  );
};

export default AdminDashboard;
