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