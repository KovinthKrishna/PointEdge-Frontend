export interface InvoiceItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }
  
  export interface Invoice {
    invoiceNumber: string;
    date: string;
    totalAmount: number;
    loyaltyPoints: number;
    items: InvoiceItem[];
  }
  