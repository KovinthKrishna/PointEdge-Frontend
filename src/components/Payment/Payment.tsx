import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import ModelBoxPopup from "../Common/ModelBoxPopup";
import PaymentMethodSelector from "./PaymentMethodSelector";
import OrderSummary from "./OrderSummary";
import { usePayment } from "../../hooks/usePayment";
import DisplayCustomer from "./DisplayCustomer";
import axios from "axios";
import Customer from "../../models/Customer";

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

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  const handleApplyDiscountAndCustomer = async (code: string) => {
    try {
      setLoadingCustomer(true);
      setCustomer(null);
      setShowCustomerPopup(false);

      const customerRes = await axios.get(
        `http://localhost:8080/api/v1/discount/customer/search?query=${code}`
      );

      if (customerRes.data.length > 0) {
        setCustomer(customerRes.data[0]);
      } else {
        setCustomer(null);
      }

      await applyDiscountCode(code);
      setShowCustomerPopup(true);
    } catch (error) {
      console.error("Error fetching customer or discount:", error);
      setCustomer(null);
      setShowCustomerPopup(true);
    } finally {
      setLoadingCustomer(false);
    }
  };
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
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            onApplyDiscount={(code) => handleApplyDiscountAndCustomer(code)}
            onDisplayCustomerDetails={() => {}}
          />
        </Box>
      </Flex>

      {showCustomerPopup && (
        <DisplayCustomer
          customer={customer}
          isOpen={showCustomerPopup}
          onClose={() => setShowCustomerPopup(false)}
          totalDiscount={orderDetails.totalDiscount}
          loading={loadingCustomer}
          status={customer ? "success" : "error"}
        />
      )}
    </ModelBoxPopup>
  );
};

export default Payment;
