import { useState } from "react";
import axios from "axios";
import { InvoiceItem } from "../models/Invoice";
<<<<<<< HEAD
=======
import Product from "../models/Product";
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc

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
<<<<<<< HEAD
      const refundRequest = {
        invoiceNumber,
        items: selectedItems.map((item) => ({
          id: item.id,
          returnQuantity: item.returnQuantity,
          refundAmount: item.refundAmount,
        })),
        refundMethod: method,
        totalAmount,
      };

      await axios.post("http://localhost:8080/api/returns/refund", refundRequest);
      onSuccess();
    } catch (error) {
      console.error("Refund processing failed", error);
=======
      const isExchange = method === "Exchange";
      const url = isExchange
        ? "http://localhost:8080/api/return-exchange/exchange"
        : method === "Card"
        ? "http://localhost:8080/api/return-exchange/refund/card"
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
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      onFailure();
    } finally {
      setIsProcessing(false);
    }
  };

<<<<<<< HEAD
  return { processRefund, isProcessing };
=======
  return {
    processRefund,
    isProcessing,
  };
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
};

export default useRefundProcessor;