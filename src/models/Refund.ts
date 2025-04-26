export interface RefundItem {
    id: string;
    returnQuantity: number;
    refundAmount: number;
  }
  
  export interface RefundRequest {
    invoiceNumber: string;
    items: {
      id: string;
      returnQuantity: number;
      refundAmount: number;
    }[];
    refundMethod: string;
    totalAmount: number;
  }
  
  