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
    items: items.map((item) => ({
<<<<<<< Updated upstream
      itemId: item.id,
      invoiceItemId: item.id,
=======
      itemId: item.productId,
      invoiceItemId: item.invoiceItemId,
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  const response = await verifyService.post(
    "http://localhost:8080/api/admin/refund-requests/submit-refund-request",
=======
  const response = await axiosInstance.post(
    `http://localhost:8080/api/admin/refund-requests/submit-refund-request?employeeId=${employeeId}`,
>>>>>>> Stashed changes
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};