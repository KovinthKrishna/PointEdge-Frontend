import APIClient from "./apiClient";
import { RefundRequest } from "../models/Refund";
import { RefundRequestDetail } from "../models/RefundRequestDetails";
import axiosInstance from "./verifyService";

const refundService = new APIClient<RefundRequest>("/api/returns/items");

export default refundService;

export const fetchRefundDetails = async (
    invoiceNumber: string
  ): Promise<RefundRequestDetail[]> => {
    const response = await axiosInstance.get<RefundRequestDetail[]>(
      `/api/return-exchange/refund-requests/invoice/${invoiceNumber}/details`
    );
    return response.data;
  };