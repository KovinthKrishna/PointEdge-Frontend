import { useState, useEffect } from "react";
import axios from "axios";
import { PaymentResponse } from "../models/PaymentResponse";
import { OrderDetails } from "../models/OrderDetails";
import useCartStore, { OrderItem } from "../store/useCartStore";

export const usePayment = () => {
  const orderItems = useCartStore((s) => s.orderItems);
  const calculateTotal = (items: OrderItem[]) =>
    items.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [splitEnabled, setSplitEnabled] = useState<boolean>(false);
  const [cashAmount, setCashAmount] = useState<number>(0);
  const [cardAmount, setCardAmount] = useState<number>(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerId: 0,
    itemId: 0,
    datetime: new Date().toISOString(),
    amount: 0,
    totalDiscount: 0,
    total: 0,
    currency: "LKR",
    orderId: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);

  useEffect(() => {
    const totalAmount = calculateTotal(orderItems);
    setOrderDetails((prev) => ({
      ...prev,
      amount: totalAmount,
      total: totalAmount - (prev.totalDiscount || 0),
    }));

    if (!splitEnabled) {
      if (paymentMethod === "cash") {
        setCashAmount(totalAmount);
        setCardAmount(0);
      } else if (paymentMethod === "card") {
        setCardAmount(totalAmount);
        setCashAmount(0);
      }
    }
  }, [orderItems, paymentMethod, splitEnabled]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/order/current");
      if (response.data) {
        setOrderDetails({
          ...orderDetails,
          amount: response.data.amount,
          totalDiscount: response.data.discount,
          total: response.data.total,
          currency: response.data.currency || "LKR",
        });

        if (paymentMethod === "cash") setCashAmount(response.data.total);
        else if (paymentMethod === "card") setCardAmount(response.data.total);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyDiscountCode = async (codeOrPhone: string) => {
    try {
      setLoading(true);
      const items: { [key: string]: number } = {};
      orderItems.forEach((item) => (items[item.id.toString()] = item.quantity));
      const requestData = { phone: codeOrPhone, items };
      const response = await axios.post(
        "http://localhost:8080/api/v1/discount/calculate-total-discount",
        requestData
      );

      if (response.data?.success) {
        setOrderDetails((prev) => ({
          ...prev,
          totalDiscount: response.data.finalTotalDiscount,
          total: response.data.finalDiscountedPrice,
        }));
      }
    } catch (error) {
      console.error("Error applying discount:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitPayment = async () => {
    try {
      setLoading(true);
      const payload = {
        orderDetails,
        paymentMethod,
        cashAmount,
        cardAmount,
      };
      const response = await axios.post<PaymentResponse>("/api/payment/submit", payload);
      setPaymentResponse(response.data);
      return response.data;
    } catch (error) {
      console.error("Error submitting payment:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    paymentMethod,
    setPaymentMethod,
    splitEnabled,
    setSplitEnabled,
    cashAmount,
    setCashAmount,
    cardAmount,
    setCardAmount,
    orderDetails,
    setOrderDetails,
    loading,
    fetchOrderDetails,
    applyDiscountCode,
    submitPayment,
    paymentResponse,
  };
};
