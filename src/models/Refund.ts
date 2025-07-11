<<<<<<< HEAD
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
  
  
=======
export interface ReturnedItem {
  itemId: number;
  quantity: number;
  returned:boolean;
  reason: string;
  refundAmount: number;
}

export interface RefundRequest {
  invoiceNumber: string;
  items: ReturnedItem[];
  refundMethod: string;
  totalAmount: number;
  reason:string;
}
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
