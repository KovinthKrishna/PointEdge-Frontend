import { useState } from "react";
import PayButton from "../SalesDashboard/PayButton";
import Payment from "./Payment";

const PayAndRenderPayment = () => {
  const [showPayment, setShowPayment] = useState(false);

  const handlePayClick = () => {
    console.log("Pay button clicked");
    setShowPayment(true);
  };

  const handleClose = () => {
    console.log("Closing payment modal");
    setShowPayment(false);
  };

  return (
    <>
      <PayButton onClick={handlePayClick} />
      {showPayment && <Payment isOpen={true} onClose={handleClose} />}
    </>
  );
};

export default PayAndRenderPayment;
