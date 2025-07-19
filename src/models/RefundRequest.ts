export interface ReturnedItem {
    itemId: number;
    quantity: number;
    reason: string;
    photoPath?: string;
  }
  
  export interface RefundRequestView {
    id: number;
    invoiceNumber: string;
    refundMethod: string;
    totalRefundAmount: number;
    createdAt: string;
    items: ReturnedItem[];
  }