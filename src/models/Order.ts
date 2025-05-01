export default interface Order {
    id: number;
    customerId: number; // ID of the customer who placed the order
    discountId?: number; // ID of the discount applied to the order
    items: number[]; // array of item IDs in the order
    totalAmount: number; // total amount of the order
    discountAmount: number; // amount discounted from the total
    finalAmount: number; // final amount after discount
    orderDate: string; // ISO date string of when the order was placed
    status: string; // status of the order (e.g., "pending", "completed", "canceled")
    paymentMethod: string; // payment method used (e.g., "credit card", "cash")
  }