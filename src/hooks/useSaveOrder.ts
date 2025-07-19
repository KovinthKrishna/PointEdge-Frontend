import axios from "axios";
import useCartStore from "../store/useCartStore";
import { useCustomerStore } from "../store/useCustomerStore";
import useOrderSummaryStore from "../store/useOrderSummaryStore";
import { fetchCurrentUser } from "../services/userService";

export async function saveOrder() {
  const { orderItems, clearCart } = useCartStore.getState();
  const { customerInfo, discountCode, clearCustomerInfo, clearDiscountCode } = useCustomerStore.getState();
  const { amount, totalDiscount, total, resetSummary } = useOrderSummaryStore.getState();

  if (orderItems.length === 0) throw new Error("No items in cart.");

  const user = await fetchCurrentUser();

  const payload = {
    customerName: customerInfo ? customerInfo.name : null,
    customerPhone: discountCode || null,  // Replace with dynamic phone if available
    loyaltyPoints: customerInfo ? customerInfo.loyaltyPoints : null,
    discountCode: discountCode || null,
    amount,
    totalDiscount,
    total,
    employeeId: user.id,
    cashierName: `${user.firstName} ${user.lastName}`,
    orderDate: new Date().toISOString(),
    items: orderItems.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      pricePerUnit: item.pricePerUnit,
    })),
  };

  await axios.post("http://localhost:8080/orders/save", payload);

  // Cleanup after save
  clearCart();
  clearCustomerInfo();
  clearDiscountCode();
  resetSummary();
}
