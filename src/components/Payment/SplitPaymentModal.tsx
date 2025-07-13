import React, { useState } from "react";
import ModelBoxPopup from "../Common/ModelBoxPopup";
import CardPaymentModal from "./CardPaymentModal";
import CashPaymentModal from "./CashPaymentModal";

interface SplitPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SplitPaymentModal: React.FC<SplitPaymentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<"card" | "cash">("card");

  const handleCardSubmit = () => {
    setStep("cash");
  };

  const handleCashClose = () => {
    setStep("card");
    onClose();
  };

  return (
    <ModelBoxPopup isOpen={isOpen} onClose={onClose}>
      {step === "card" ? (
        <CardPaymentModal
          onClose={handleCardSubmit}
          onSubmit={handleCardSubmit}
        />
      ) : (
        <CashPaymentModal onClose={handleCashClose} />
      )}
    </ModelBoxPopup>
  );
};

export default SplitPaymentModal;
