import APIClient from "./apiClient";
import { RefundRequest } from "../models/Refund";

const refundClient = new APIClient<RefundRequest>("/refunds");

export default refundClient;
