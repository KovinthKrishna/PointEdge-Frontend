import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import ModelBoxPopup from "../Common/ModelBoxPopup";
import PaymentMethodSelector from "./PaymentMethodSelector";
import OrderSummary from "./OrderSummary";
import axios from "axios"; // Import axios for API calls

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderDetailsType {
  amount: number;
  discount: number;
  total: number;
  currency: string;
}

const Payment: React.FC<PaymentProps> = ({ isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [splitEnabled, setSplitEnabled] = useState<boolean>(false);
  const [cashAmount, setCashAmount] = useState<number>(0);
  const [cardAmount, setCardAmount] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetailsType>({
    amount: 1208.23,
    discount: 0,
    total: 1208.23,
    currency: "LKR",
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch order details from backend
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // Replace with your API endpoint
      const response = await axios.get("/api/order/current");
      if (response.data) {
        setOrderDetails({
          amount: response.data.amount,
          discount: response.data.discount,
          total: response.data.total,
          currency: response.data.currency || "LKR",
        });

        // Set initial amounts
        if (paymentMethod === "cash") {
          setCashAmount(response.data.total);
        } else {
          setCardAmount(response.data.total);
        }
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      // You might want to show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  // Apply discount code
  const applyDiscountCode = async (code: string) => {
    try {
      setLoading(true);
      // Replace with your API endpoint
      const response = await axios.post("/api/order/discount", { code });
      if (response.data) {
        setOrderDetails({
          ...orderDetails,
          discount: response.data.discount,
          total: response.data.total,
        });
      }
    } catch (error) {
      console.error("Error applying discount:", error);
      // You might want to show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  // For demo purposes, initialize with total amount
  useEffect(() => {
    // This would normally be replaced with fetchOrderDetails()
    if (paymentMethod === "cash") {
      setCashAmount(orderDetails.total);
      setCardAmount(0);
    } else {
      setCardAmount(orderDetails.total);
      setCashAmount(0);
    }
  }, [paymentMethod, orderDetails.total]);

  // Handle payment method change
  useEffect(() => {
    if (!splitEnabled) {
      if (paymentMethod === "cash") {
        setCashAmount(orderDetails.total);
        setCardAmount(0);
      } else {
        setCardAmount(orderDetails.total);
        setCashAmount(0);
      }
    }
  }, [paymentMethod, splitEnabled, orderDetails.total]);

  // Handle split payment
  useEffect(() => {
    if (splitEnabled) {
      // Keep both payment methods active
    } else {
      // Reset the non-selected payment method
      if (paymentMethod === "cash") {
        setCashAmount(orderDetails.total);
        setCardAmount(0);
      } else {
        setCardAmount(orderDetails.total);
        setCashAmount(0);
      }
    }
  }, [splitEnabled, paymentMethod, orderDetails.total]);

  return (
    <ModelBoxPopup isOpen={isOpen} onClose={onClose}>
      <Flex height="100%" width="100%">
        {/* Left Part - Payment Method */}
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
          />
        </Box>

        {/* Right Part - Order Summary */}
        <Box
          width="50%"
          padding="40px"
          borderLeft="1px solid #e0e0e0"
          pt={20}
          display="flex"
          flexDirection="column"
        >
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
