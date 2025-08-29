import APIClient from "./apiClient";
import { Invoice } from "../models/Invoice";


const invoiceService = new APIClient<Invoice>("/api/returns/invoice");

export default invoiceService;

