import axios from "axios";
import { useState } from "react";
import { InvoiceItem } from "../models/Invoice";

interface UseRefundProcessorParams {
  invoiceNumber: string;
  selectedItems: InvoiceItem[];
  totalAmount: number;
  refundRequestId?: number | null;
  onSuccess: () => void;
  onFailure: () => void;
}

const useRefundProcessor = ({
  invoiceNumber,
  selectedItems,
  totalAmount,
  refundRequestId,
  onSuccess,
  onFailure,
}: UseRefundProcessorParams) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processRefund = async (method: string) => {
    setIsProcessing(true);
    try {
      const isExchange = method === "Exchange";
      const url = isExchange
        ? "http://localhost:8080/api/return-exchange/exchange"
        : method === "Card"
        ? "http://localhost:8080/api/return-exchange/card-refund"
        : "http://localhost:8080/api/return-exchange/refund";

        const payload: any = isExchange
        ? {
            invoiceNumber,
            returnedItems: selectedItems.map((item) => ({
              itemId: item.id,
              quantity: item.returnQuantity,
              reason: item.reason || "",
            })),
          }
        : {
            invoiceNumber,
            refundMethod: method,
            totalAmount,
            requestId: refundRequestId, 
            items: selectedItems.map((item) => ({
              itemId: item.id,
              quantity: item.returnQuantity,
              reason: item.reason || "",
            })),
          };

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
