import APIClient from "./apiClient";
import { Invoice } from "../models/Invoice";

const invoiceClient = new APIClient<Invoice>("/invoices");

export default invoiceClient;
