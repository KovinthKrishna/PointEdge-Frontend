// types/refund.ts
export interface InvoiceItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }
  
  export interface InvoiceData {
    id: string;
    date: string;
    items: InvoiceItem[];
    total: number;
  }
  
  export interface SelectedItem extends InvoiceItem {
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
  
  export interface RefundResponse {
    success: boolean;
    transactionId?: string;
    message?: string;
  }