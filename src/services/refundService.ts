import APIClient from "./apiClient";
import { RefundRequest } from "../models/Refund";

const refundService = new APIClient<RefundRequest>("/api/returns/items");

export default refundService;
