import axios from "axios";
import useCartStore from "../store/useCartStore";
import { useCustomerStore } from "../store/useCustomerStore";
import useOrderSummaryStore from "../store/useOrderSummaryStore";
import { fetchCurrentUser } from "../services/userService";
import usePaymentInfoStore from "../store/usePaymentInfoStore";

export async function saveOrder() {
  const { orderItems} = useCartStore.getState();
  const { customerInfo, discountCode,} = useCustomerStore.getState();
  const { amount, totalDiscount, total } = useOrderSummaryStore.getState();
  const { paymentInfo } = usePaymentInfoStore.getState();

  if (orderItems.length === 0) throw new Error("No items in cart.");
  if (!paymentInfo) throw new Error("Payment information is missing.");

  const user = await fetchCurrentUser();

  const payload = {
    customerName: customerInfo ? customerInfo.name : null,
    customerPhone: discountCode || null,
    loyaltyPoints: customerInfo ? customerInfo.loyaltyPoints : null,
    discountCode: discountCode || null,
    amount,
    totalDiscount,
    total,
    employeeId: user.id,
    cashierName: `${user.firstName} ${user.lastName}`,
    cashAmount: paymentInfo.cashAmount,
    cardAmount: paymentInfo.cardAmount,
    items: orderItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      pricePerUnit: item.pricePerUnit,
    })),
  };

  const response = await axios.post("http://localhost:8080/orders/save", payload);
  return response.data;

}
