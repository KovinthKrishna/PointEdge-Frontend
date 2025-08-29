export interface ReturnedItem {
    itemId: number;
    quantity: number;
    reason: string;
    photoPath?: string;
    productId?: number;
    productName?: string;
    unitPrice?: number;
    refundAmount?: number;
    invoiceItemId?: number;
  }
  
  export interface RefundRequestView {
    id: number;
    invoiceNumber: string;
    refundMethod: string;
    totalRefundAmount: number;
    createdAt: string;
    items: ReturnedItem[];
  }