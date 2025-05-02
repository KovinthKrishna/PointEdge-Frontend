// TestingPage.tsx
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import RegistrationForm from "../components/RegistrationForm";
import Payment from "../components/Payment/Payment";

const TestingPage: React.FC = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Registration Modal
  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  // Payment Modal
  const openPaymentModal = () => setIsPaymentOpen(true);
  const closePaymentModal = () => setIsPaymentOpen(false);

  return (
    <div>
      <Button onClick={openRegistrationModal}>Open Registration Form</Button>
      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={closeRegistrationModal}
      />

      <Button onClick={openPaymentModal}>Open Payment</Button>
      <Payment isOpen={isPaymentOpen} onClose={closePaymentModal} />
    </div>
  );
};

export default TestingPage;
