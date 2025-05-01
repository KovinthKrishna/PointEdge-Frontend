export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  returnQuantity: number; 
  refundAmount: number; 
  total: number;
}

  
  export interface Invoice {
    invoiceNumber: string;
    date: string;
    items: InvoiceItem[]; 
    totalAmount: number;
  }
  
  