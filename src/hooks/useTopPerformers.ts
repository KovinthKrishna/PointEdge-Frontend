import { useState, useEffect, useCallback } from "react";
import { EmployeePerformance } from "../models/Performance";

// Define types
export type SortField = "orders" | "sales" | "workingHours";
export type SortDirection = "asc" | "desc";
export type TimeRange = "all" | "lastMonth" | "lastWeek";

export const useTopPerformers = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("sales");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [employees, setEmployees] = useState<EmployeePerformance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>("all");

  // Common fetch function
  const fetchData = useCallback(async (url: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch employee performance data");
      }
      
      const data = await response.json() as EmployeePerformance[];
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching data");
      console.error("Error fetching employee performance:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data based on sort and filter options
  useEffect(() => {
    const buildUrl = (): string => {
      let url = `http://localhost:8080/api/performance/top-performers?sortBy=${sortField}&sortDirection=${sortDirection}`;
      
      // Add date range filters if applicable
      if (timeRange === "lastMonth") {
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(today.getMonth() - 1);
        
        url += `&startDate=${lastMonth.toISOString().split('T')[0]}&endDate=${today.toISOString().split('T')[0]}`;
      } else if (timeRange === "lastWeek") {
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        
        url += `&startDate=${lastWeek.toISOString().split('T')[0]}&endDate=${today.toISOString().split('T')[0]}`;
      }
      
      return url;
    };

    fetchData(buildUrl());
  }, [sortField, sortDirection, timeRange, fetchData]);
  
  // Handle search
  const handleSearch = useCallback(async (): Promise<void> => {
    if (!searchQuery.trim()) {
      return;
    }
    
    await fetchData(`http://localhost:8080/api/performance/search?query=${encodeURIComponent(searchQuery)}`);
  }, [searchQuery, fetchData]);
  
  // Handle sorting
  const handleSort = useCallback((field: SortField): void => {
    setSortField(prevField => {
      setSortDirection(prevDirection => {
        if (prevField === field) {
          return prevDirection === "asc" ? "desc" : "asc";
        }
        return "desc";
      });
      return field;
    });
  }, []);

  // Format currency helper
  const formatCurrency = useCallback((amount: number): string => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }, []);

  return {
    // State
    employees,
    loading,
    error,
    searchQuery,
    sortField,
    sortDirection,
    timeRange,
    
    // Setters
    setSearchQuery,
    setTimeRange,
    
    // Actions
    handleSearch,
    handleSort,
    formatCurrency
  };
};