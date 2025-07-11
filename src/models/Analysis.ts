import axios from "axios";
export interface TopSellingProduct {
    productName: string;
    quantitySold: number;
  }
  
  export interface SalesOverTime {
    date: string;
    totalSales: number;
  }
  
  export interface RevenueByProduct {
    productName: string;
    revenue: number;
  }
  
  export interface ReturnRate {
    productName: string;
    returnRate: number;
  }
  
  export interface CategoryDistribution {
    category: string;
    count: number;
  }
  
  export const fetchTopSellingProducts = async (): Promise<TopSellingProduct[]> => {
    const res = await fetch(`http://localhost:8080/api/analytics/top-selling-products`);
    return res.json();
  };
  export const fetchSalesOverTime = async (): Promise<SalesOverTime[]> => {
    const response = await axios.get(`http://localhost:8080/api/analytics/sales-over-time`);
    return response.data;
  };
  
  export const fetchRevenueByProduct = async (): Promise<RevenueByProduct[]> => {
    const response = await axios.get(`http://localhost:8080/api/analytics/revenue`);
    return response.data;
  };
  
  export const fetchReturnRates = async (): Promise<ReturnRate[]> => {
    const response = await axios.get(`http://localhost:8080/api/analytics/return-rates`);
    return response.data;
  };
  
  export const fetchCategoryDistribution = async (): Promise<CategoryDistribution[]> => {
    const response = await axios.get(`http://localhost:8080/api/analytics/category-distribution`);
    return response.data;
  };