export default interface OrderDetails {
    id?: number; 
    customerId: number;
    customerName?: string;
    customerPhone?: string;
    itemId: number;
    discountId?: number | null;
    itemName?: string;
    datetime: string; 
    amount: number;
    totalDiscount: number;
    itemDiscount?: number | null;
    categoryDiscount?: number | null;
    loyaltyDiscount?: number | null;
    loyaltyTier?: string | null;
    pointsEarned?: number | null;
    orderId: string;
  }