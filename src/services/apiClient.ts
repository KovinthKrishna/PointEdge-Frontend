import axios, { AxiosRequestConfig } from "axios";

const baseURL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL,
});

export const getProductImageUrl = (imageName: string) => {
  return `${baseURL}/products/images/${imageName}`;
};

export const getProductImageActionUrl = (id: number) => {
  return `${baseURL}/products/${id}/image`;
};

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config: AxiosRequestConfig) => {
    const res = await axiosInstance.get<T[]>(this.endpoint, config);
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
