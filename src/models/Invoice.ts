export interface InvoiceItem {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }
  
  export interface Invoice {
    id: string;
    date: string;
    items: {
      id: string;
      productName: string;
      quantity: number;
      price: number;
    }[];
    totalAmount: number;
  }
  
  