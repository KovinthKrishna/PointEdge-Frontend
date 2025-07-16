import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import ModelBoxPopup from "../Common/ModelBoxPopup";
import PaymentMethodSelector from "./PaymentMethodSelector";
import OrderSummary from "./OrderSummary";
import { usePayment } from "../../hooks/usePayment";

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void;
}

const Payment: React.FC<PaymentProps> = ({ isOpen, onClose }) => {
  const {
    paymentMethod,
    setPaymentMethod,
    splitEnabled,
    setSplitEnabled,
    cashAmount,
    setCashAmount,
    cardAmount,
    setCardAmount,
    orderDetails,
    applyDiscountCode,
  } = usePayment();

  return (
    <ModelBoxPopup isOpen={isOpen} onClose={onClose}>
      <Flex height="100%" width="100%">
        <Box width="50%" padding="40px" pt={20}>
          <PaymentMethodSelector
            selectedMethod={paymentMethod}
            setSelectedMethod={setPaymentMethod}
            totalAmount={orderDetails.total}
            splitEnabled={splitEnabled}
            setSplitEnabled={setSplitEnabled}
            cashAmount={cashAmount}
            setCashAmount={setCashAmount}
            cardAmount={cardAmount}
            setCardAmount={setCardAmount}
            orderDetails={orderDetails}
          />
        </Box>

        <Box width="50%" padding="40px" borderLeft="1px solid #e0e0e0" pt={20}>
          <OrderSummary
            orderDetails={orderDetails}
            onApplyDiscount={applyDiscountCode}
          />
        </Box>
      </Flex>
    </ModelBoxPopup>
  );
};

export default Payment;
