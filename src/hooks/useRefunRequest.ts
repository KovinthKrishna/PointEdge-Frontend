import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/verifyService";
import { RefundRequestViewDTO } from "../models/ReturnTypes";

export const useRefundRequests = () => {
  return useQuery<RefundRequestViewDTO[]>({
    queryKey: ["refundRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/admin/refund-requests/pending");
      return res.data;
    },
    staleTime: 30000, // optional: mark as fresh for 30s
    refetchInterval: 30000, // optional: auto-refresh every 30s
  });
};