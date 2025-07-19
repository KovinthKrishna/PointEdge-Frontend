import axiosInstance from "../axiosConfig";
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
      formData.append("images", item.returnPhoto, `image_${index}.jpg`);
    }
  });

  const response = await axiosInstance.post(
    "http://localhost:8080/api/admin/refund-requests/submit-refund-request",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};