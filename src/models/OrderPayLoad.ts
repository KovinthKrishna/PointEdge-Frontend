interface OrderPayload {
  customerName: string;
  customerPhone: string;
  loyaltyPoints: number;
  discountCode: string;
  amount: number;
  totalDiscount: number;
  total: number;
  cashierName: string;
  orderDate: string;
  items: {
    productId: number;
    quantity: number;
    pricePerUnit: number;
  }[];
}
