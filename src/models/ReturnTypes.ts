export interface ReturnedItem {
    productId: number;
    itemId: number;
    invoiceItemId: number;
    quantity: number;
    unitPrice: number;
    reason: string;
    photoPath: string;
    productName: string;
    refundAmount: number;
  }
  
  export interface RefundRequestViewDTO {
    id: number;
    invoiceNumber: string;
    refundMethod: string;
    totalRefundAmount: number;
    createdAt: string;
    items: ReturnedItem[];
  }
  