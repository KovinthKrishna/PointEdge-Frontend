export interface InvoiceItem {
  photoPath: any;
  photoPreviewUrl: any;
  returnPhoto: any;
  id: string;                    
  productId: string;             
  name: string;
  quantity: number;
  price: number;
  returnQuantity: number;
  refundAmount: number;
  total: number;
  reason?: string;
}

  
export interface Invoice {
  invoiceNumber: string;
  date: string;
  items: InvoiceItem[];
  totalAmount: number;
}



  
  