export interface ReturnedItem {
  itemId: string;
  quantity: number;
  refundAmount: number;
  reason: string;
}

export interface RefundRequest {
  invoiceNumber: string;
  items: ReturnedItem[];
  refundMethod: string;
  totalAmount: number;
}