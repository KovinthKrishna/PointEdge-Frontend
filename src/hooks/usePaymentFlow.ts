import { useState } from "react";

export const usePaymentFlow = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const showSuccess = (title: string, description: string) => {
    setAlertTitle(title);
    setAlertDescription(description);
    setIsAlertOpen(true);
  };

  const showError = (title: string, description: string) => {
    setAlertTitle(title);
    setAlertDescription(description);
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    // Only open receipt if success
    if (alertTitle.toLowerCase().includes("success")) {
      setIsReceiptOpen(true);
    }
  };

  return {
    isAlertOpen,
    alertTitle,
    alertDescription,
    isReceiptOpen,
    showSuccess,
    showError,
    handleAlertClose,
    setIsReceiptOpen,
  };
};
