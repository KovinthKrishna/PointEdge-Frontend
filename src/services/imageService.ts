import axios from "axios";
import { InvoiceItem } from "../models/Invoice";

export const submitRefundRequestWithImages = async (
  invoiceNumber: string,
  refundMethod: string,
  items: InvoiceItem[]
): Promise<string> => {
  const formData = new FormData();

  const requestPayload = {
    invoiceNumber,
    refundMethod,
    items: items.map((item) => ({
      itemId: item.id,
      quantity: item.returnQuantity,
      reason: item.reason,
      unitPrice: item.price,
      photoPath: "", // Backend will set this after saving image
    })),
  };

  formData.append(
    "data",
    new Blob([JSON.stringify(requestPayload)], {
      type: "application/json",
    })
  );

  items.forEach((item, index) => {
    if (item.returnPhoto) {
      formData.append("images", item.returnPhoto, `photo_${index}.jpg`);
    }
  });

  const response = await axios.post(
    "http://localhost:8080/api/admin/refund-requests/initiate",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};