import React, { useState } from "react";
import ModelBoxPopup from "../Common/ModelBoxPopup";
import CardPaymentModal from "./CardPaymentModal";
import { usePaymentFlow } from "../../hooks/usePaymentFlow";
import SplitCash from "./SplitCash";

interface SplitPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency: string;
  cardAmount: number;
  cashAmount: number;
  onComplete: () => void;
}

const SplitPaymentModal: React.FC<SplitPaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  currency,
  cardAmount,
  cashAmount,
  onComplete,
}) => {
  const [step, setStep] = useState<"cash" | "card">("cash");
  const { showSuccess, setIsReceiptOpen } = usePaymentFlow();

  const handleCashSuccess = () => {
    setStep("card");
  };

  const handleCardSuccess = () => {
    showSuccess("Payment Successful", "Both Cash & Card payments received.");
    setIsReceiptOpen(true);
    onClose();
    onComplete();
  };

  const handleCancel = () => {
    setStep("cash");
    onClose();
  };

  return (
    <ModelBoxPopup isOpen={isOpen} onClose={handleCancel}>
      {step === "cash" ? (
        <SplitCash amount={cashAmount} onPaymentSuccess={handleCashSuccess} />
      ) : (
        <CardPaymentModal
          onClose={() => {}}
          amount={cardAmount}
          currency={currency}
          showSuccess={(title, desc) => console.log(title, desc)}
          showError={(title, desc) => console.error(title, desc)}
          setIsReceiptOpen={() => {}}
          onPaymentSuccess={handleCardSuccess}
        />
      )}
    </ModelBoxPopup>
  );
};

export default SplitPaymentModal;
