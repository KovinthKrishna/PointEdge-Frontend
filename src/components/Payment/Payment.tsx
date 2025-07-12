import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import ModelBoxPopup from "../Common/ModelBoxPopup";
import PaymentMethodSelector from "./PaymentMethodSelector";
import OrderSummary from "./OrderSummary";
import axios from "axios"; // Import axios for API calls
import useCartStore, { OrderItem } from "../../store/useCartStore";

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
  const calculateTotal = (orderItems: OrderItem[]) => {
    return orderItems.reduce(
      (sum, orderItem) => sum + orderItem.pricePerUnit * orderItem.quantity,
      0
    );
  };

  const orderItems = useCartStore((s) => s.orderItems);
  const totalAmount = calculateTotal(orderItems);

  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [splitEnabled, setSplitEnabled] = useState<boolean>(false);
  const [cashAmount, setCashAmount] = useState<number>(0);
  const [cardAmount, setCardAmount] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetailsType>({
    amount: totalAmount,
    discount: 0,
    total: totalAmount,
    currency: "LKR",
  });

  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch order details from backend
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // API endpoint
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
    } finally {
      setLoading(false);
    }
  };

  // Apply discount code
  const applyDiscountCode = async (codeOrPhone: string) => {
    try {
      setLoading(true);

      // Convert orderItems into the required structure { "1": 2, "2": 1 }
      const items: { [productId: string]: number } = {};
      orderItems.forEach((item) => {
        items[item.id.toString()] = item.quantity;
      });

      const requestData = {
        phone: codeOrPhone,
        items: items,
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/discount/calculate-total-discount",
        requestData
      );

      if (response.data && response.data.success) {
        const discount = response.data.finalTotalDiscount;
        const total = response.data.finalDiscountedPrice;

        // Update order details with the discount
        setOrderDetails({
          amount: totalAmount,
          discount: discount,
          total: total,
          currency: "LKR",
        });

        // Optional: Show loyalty info
        console.log(`Loyalty Tier: ${response.data.loyaltyTier}`);
        console.log(
          `Customer Name: ${response.data.title} ${response.data.name}`
        );
      } else {
        console.error("Discount API returned failure.");
      }
    } catch (error) {
      console.error("Error applying discount:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const amount = calculateTotal(orderItems);
    setOrderDetails((prev) => ({
      ...prev,
      amount: amount,
      total: amount - prev.discount, // discount will be 0 initially
    }));
  }, [orderItems]);

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
