import { ReturnedItem } from "./ReturnTypes";

export interface RefundRequestDetail {
    id: number;
    invoiceNumber: string;
    refundMethod: string;
    totalRefundAmount: number;
    createdAt: string;
    reviewedAt: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'|' CANCELLED';
    customerId: number;
    customerName: string;
    reviewedBy?: string;
    items: ReturnedItem[];
  }