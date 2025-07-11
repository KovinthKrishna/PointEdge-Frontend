<<<<<<< HEAD
// CustomerModal.tsx
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
import { useMatches, useNavigate, useSearchParams } from "react-router-dom";
import CustomerOrders from "./CustomerFind";
import CustomerAdd from "./CustomerAdd";
import CustomerDetails from "./CustomerDetails";
<<<<<<< HEAD
=======
import "./styles/CustomerModal.css";
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc

export const CustomerModal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
<<<<<<< HEAD
  const view = searchParams.get("view") ;
=======
  const view = searchParams.get("view");
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc

  // Get valid views from route handle
  const matches = useMatches();
  const currentMatch = matches.find(m => m.pathname === '/admin/discounts/customers') as { handle?: { validViews?: string[] } };
  const validViews = currentMatch?.handle?.validViews || ['orders'];

  // Validate view parameter
  const validatedView = validViews.includes(view ?? '') ? view ?? 'orders' : 'orders';

  const handleClose = () => {
    navigate(-1);
  };

  const renderContent = () => {
    switch(validatedView) {
      case 'details':
        return <CustomerDetails onClose={handleClose} customerId={""} onCustomerDeleted={function (): void {
          throw new Error("Function not implemented.");
        } } />;
      case 'add':
<<<<<<< HEAD
        return <CustomerAdd onClose={handleClose} onCustomerAdded={function (newCustomer: { phone: string; }): void {
=======
        return <CustomerAdd onClose={handleClose} onCustomerAdded={function (): void {
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
          throw new Error("Function not implemented.");
        } } />;
      case 'orders':
      default:
        return <CustomerOrders onClose={handleClose} />;
    }
  };

<<<<<<< HEAD
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "1000px",
    height: "90vh",
    maxHeight: "700px",
    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.3)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
  };

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
=======
  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal-container">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
        {renderContent()}
      </div>
    </div>
  );
};
<<<<<<< HEAD
=======

export default CustomerModal;
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
