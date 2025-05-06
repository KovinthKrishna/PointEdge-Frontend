import axios, { AxiosRequestConfig } from "axios";

const baseURL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL,
});

export const getProductImageUrl = (imageName: string) =>
  `${baseURL}/products/images/${imageName}`;

export const getProductImageActionUrl = (id: number) =>
  `${baseURL}/products/${id}/image`;

export interface PaginatedResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config: AxiosRequestConfig) => {
    const res = await axiosInstance.get<T[]>(this.endpoint, config);
    return res.data;
  };

  getPaginated = async (config: AxiosRequestConfig) => {
    const res = await axiosInstance.get<PaginatedResponse<T>>(
      this.endpoint,
      config
    );
    return res.data;
  };

  getByKey = async (key: string | number) => {
    const res = await axiosInstance.get<T>(`${this.endpoint}/${key}`);
    return res.data;
  };

  post = async (data: T) => {
    const res = await axiosInstance.post<T>(this.endpoint, data);
    return res.data;
  };

  put = async (data: T) => {
    const res = await axiosInstance.put<T>(this.endpoint, data);
    return res.data;
  };
}

export default APIClient;
