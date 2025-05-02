// DiscountsPage.tsx
import { useMatches } from "react-router-dom";
import { CustomerModal } from "../../components/Discountpage/CustomerModal";
import DiscountDashboard from "../../components/Discountpage/DiscountDashboard";

const DiscountsPage = () => {
  const matches = useMatches();
  const showCustomerModal = matches.some(
    (match) =>
      (match.handle as { showCustomerModal?: boolean })?.showCustomerModal
  );

  return (
    <div className="discounts-page">
      <DiscountDashboard />
      {showCustomerModal && <CustomerModal />}
    </div>
  );
};

export default DiscountsPage;
