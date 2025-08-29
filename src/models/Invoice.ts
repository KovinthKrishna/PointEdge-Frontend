export interface InvoiceItem {
  invoiceItemId: any;
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
  date: Date;
  items: InvoiceItem[];
  totalAmount: number;
}



  
  