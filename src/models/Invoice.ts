export interface InvoiceItem {
<<<<<<< HEAD
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
=======
  id: string;
  name: string;
  quantity: number;
  price: number;
  returnQuantity: number; 
  refundAmount: number; 
  total: number;
  reason?:string;
}

  
export interface Invoice {
  invoiceNumber: string;
  date: string;
  items: InvoiceItem[];
  totalAmount: number;
}



>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  
  