import { InvoiceItem } from "../models/Invoice";

interface RefundPayload {
  invoiceNumber: string;
  items: {
    id: string;
    returnQuantity: number;
    refundAmount: number;
  }[];
  refundMethod: string;
  totalAmount: number;
}

export const validateRefundRequest = (
  invoiceNumber: string,
  items: InvoiceItem[],
  refundMethod: string,
  totalAmount: number
): { valid: boolean; message?: string; payload?: RefundPayload } => {
  if (!invoiceNumber) {
    return { valid: false, message: "Invoice number is missing." };
  }

  if (!refundMethod) {
    return { valid: false, message: "Refund method not selected." };
  }

  const selectedItems = items.filter((item) => item.returnQuantity > 0);

  if (selectedItems.length === 0) {
    return { valid: false, message: "No items selected for return." };
  }

  for (const item of selectedItems) {
    if (
      item.returnQuantity < 0 ||
      item.returnQuantity > item.quantity ||
      isNaN(item.returnQuantity)
    ) {
      return {
        valid: false,
        message: `Invalid return quantity for item: ${item.name}`,
      };
    }

    const expectedAmount = item.returnQuantity * item.price;
    if (
      item.refundAmount !== expectedAmount ||
      isNaN(item.refundAmount)
    ) {
      return {
        valid: false,
        message: `Refund amount mismatch for item: ${item.name}`,
      };
    }
  }

  const calculatedTotal = selectedItems.reduce(
    (sum, item) => sum + item.refundAmount,
    0
  );

  if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
    return {
      valid: false,
      message: `Total refund amount mismatch. Expected: ${calculatedTotal}, got: ${totalAmount}`,
    };
  }

  const payload: RefundPayload = {
    invoiceNumber,
    items: selectedItems.map((item) => ({
      id: item.id,
      returnQuantity: item.returnQuantity,
      refundAmount: item.refundAmount,
    })),
    refundMethod,
    totalAmount,
  };

  return { valid: true, payload };
};