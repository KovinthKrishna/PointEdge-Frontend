import { InvoiceItem } from "../models/Invoice";

import verifyService from "./verifyService";


export const submitRefundRequestWithImages = async (
  invoiceNumber: string,
  refundMethod: string,
  items: InvoiceItem[],
  employeeId: number
): Promise<string> => {
  const formData = new FormData();

    const requestPayload = {
    invoiceNumber,
    refundMethod,
    employeeId,
    items: items.map((item) => ({
      invoiceItemId: item.invoiceItemId,
      quantity: item.returnQuantity,
      reason: item.reason,
      unitPrice: item.price,
      refundAmount: item.price * item.returnQuantity,
    })),
  };

  console.log("Request payload:", JSON.stringify(requestPayload, null, 2));
  console.log("Items being sent:", requestPayload.items);

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

  const response = await verifyService.post(
    `http://localhost:8080/api/admin/refund-requests/submit-refund-request?employeeId=${employeeId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};