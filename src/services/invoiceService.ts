import APIClient from "./apiClient";
import { Invoice } from "../models/Invoice";

// Create a service instance (base endpoint)
const invoiceService = new APIClient<Invoice>("/api/returns/invoice");

export default invoiceService;

