import axios, { AxiosRequestConfig } from "axios";
<<<<<<< HEAD
// import Discount from "../models/Discount";
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc

const baseURL = "http://localhost:8080/api/v1"; 
const axiosInstance = axios.create({
  baseURL,
});

class APIClient<T = any> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig) => {
    const res = await axiosInstance.get(this.endpoint, config);
    return res.data;
  };

  get = async (id: number | string) => {
    const res = await axiosInstance.get(`${this.endpoint}/${id}`);
    return res.data;
  };

  post = async (data: any) => {
    const res = await axiosInstance.post(this.endpoint, data);
    return res.data;
  };

<<<<<<< HEAD
  // put = async (id: number, discountData: Discount, data: T & { id: number; }) => {
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  put = async (data: T & { id: number; }) => {
    const res = await axiosInstance.put(`${this.endpoint}/${data.id}`, data);
    return res.data;
  };

  delete = async (id: number | string) => { 
    await axiosInstance.delete(`${this.endpoint}/${id}`);
  };
}

export default APIClient;