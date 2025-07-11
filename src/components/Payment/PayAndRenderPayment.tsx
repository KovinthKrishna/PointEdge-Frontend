import { useState } from "react";
import PayButton from "../SalesDashboard/PayButton";
import Payment from "./Payment";

const PayAndRenderPayment = () => {
  const [showPayment, setShowPayment] = useState(false);

  const handlePayClick = () => {
    setShowPayment(true); // open payment component
  };

  const handleClose = () => {
    setShowPayment(false); // close payment component
  };

  return (
    <>
      <PayButton onClick={handlePayClick} />
      {showPayment && <Payment isOpen={true} onClose={handleClose} />}
    </>
  );
};

export default PayAndRenderPayment;
