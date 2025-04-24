import Product from "../models/Product";
import APIClient from "./apiClient";

export default new APIClient<Product>("/products");
