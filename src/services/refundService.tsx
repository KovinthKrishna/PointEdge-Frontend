// services/refundService.ts
import axios from 'axios';

const API_URL = 'your-api-base-url';

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

export const refundService = {
  // Fetch invoice details
  getInvoiceDetails: async (invoiceNumber: string) => {
    try {
      const response = await axios.get(`${API_URL}/invoices/${invoiceNumber}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch invoice details');
    }
  },
  
  // Process refund
  processRefund: async (refundData: RefundRequest) => {
    try {
      const response = await axios.post(`${API_URL}/refunds`, refundData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to process refund');
    }
  }
};