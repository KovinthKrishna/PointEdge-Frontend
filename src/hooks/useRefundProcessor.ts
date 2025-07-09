// useRefundProcessor.ts (Updated)
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
      const payload: any = {
        invoiceNumber,
        refundMethod: method,
        totalAmount,
        items: selectedItems.map((item) => ({
          itemId: item.id,
          quantity: item.returnQuantity,
          reason: item.reason || "",
        })),
      };

      if (method === "Exchange" && product) {
        payload.replacementProductId = product.id;
      }

      const url =
        method === "Card"
          ? "http://localhost:8080/api/return-exchange/refund/card"
          : "http://localhost:8080/api/return-exchange/refund";

      await axios.post(url, payload);
      onSuccess();
    } catch (error) {
      console.error("Refund processing failed:", error);
      onFailure();
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processRefund,
    isProcessing,
  };
};

export default useRefundProcessor;