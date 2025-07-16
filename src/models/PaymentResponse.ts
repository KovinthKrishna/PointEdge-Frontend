export interface PaymentResponse {
  paymentId: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  timestamp: string;
  receiptUrl?: string;
  cardLast4?: string;
  cardBrand?: string;
  failureReason?: string;
  receiptNumber?: string;
}