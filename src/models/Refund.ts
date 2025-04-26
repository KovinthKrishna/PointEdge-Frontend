export interface RefundItem {
    id: string;
    returnQuantity: number;
    refundAmount: number;
  }
  
  export interface RefundRequest {
    invoiceNumber: string;
    items: RefundItem[];
    refundMethod: string;
    totalAmount: number;
  }
  