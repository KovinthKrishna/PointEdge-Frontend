import { useMatches, useNavigate, useSearchParams } from "react-router-dom";
import CustomerOrders from "./CustomerFind";
import CustomerAdd from "./CustomerAdd";
import CustomerDetails from "./CustomerDetails";
import "./styles/CustomerModal.css";

export const CustomerModal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");

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
        return <CustomerAdd onClose={handleClose} onCustomerAdded={function (): void {
          throw new Error("Function not implemented.");
        } } />;
      case 'orders':
      default:
        return <CustomerOrders onClose={handleClose} />;
    }
  };

  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default CustomerModal;