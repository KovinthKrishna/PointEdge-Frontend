import { useState } from "react";
import axios from "axios";
import { InvoiceItem } from "../models/Invoice";
import Product from "../models/Product";

interface UseRefundProcessorParams {
  invoiceNumber: string;
  selectedItems: InvoiceItem[];
  totalAmount: number;
  onSuccess: () => void;
  onFailure: () => void;
}

const useRefundProcessor = ({
  invoiceNumber,
  selectedItems,
  totalAmount,
  onSuccess,
  onFailure,
}: UseRefundProcessorParams) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processRefund = async (method: string, product?: Product) => {
    setIsProcessing(true);
    try {
      const refundRequest = {
        invoiceNumber,
        items: selectedItems.map((item) => ({
          id: item.id,
          returnQuantity: item.returnQuantity,
          refundAmount: item.refundAmount,
        })),
        refundMethod: method,
        exchange:product,
        totalAmount,
      };

      await axios.post("http://localhost:8080/api/returns/refund", refundRequest);
      onSuccess();
    } catch (error) {
      console.error("Refund processing failed", error);
      onFailure();
    } finally {
      setIsProcessing(false);
    }
  };

  return { processRefund, isProcessing };
};

export default useRefundProcessor;