import axios from "axios";

export const saveOrderPayment = async ({
  orderId,
  method,
  cashAmount,
  cardAmount,
  amountPaidByCustomer,
}: {
  orderId: number;
  method: "CASH" | "CARD" | "SPLIT";
  cashAmount?: number;
  cardAmount?: number;
  amountPaidByCustomer?: number;
}) => {
  const response = await axios.post("http://localhost:8080/api/order-payments/save", {
    orderId,
    method,
    cashAmount,
    cardAmount,
    amountPaidByCustomer,
  });

  return response.data;
};
