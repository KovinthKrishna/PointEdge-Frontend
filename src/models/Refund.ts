export interface ReturnedItem {
  itemId: number;
  quantity: number;
  returned:boolean;
  reason: string;
  refundAmount: number;
  invoiceItemId: number;
}

export interface RefundRequest {
  invoiceNumber: string;
  items: ReturnedItem[];
  refundMethod: string;
  totalAmount: number;
  reason:string;
}
