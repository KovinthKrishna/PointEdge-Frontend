import { useCallback, useEffect, useState } from "react";
import { EmployeePerformance } from "../models/Performance";
export type SortField = "orders" | "sales" | "workinghours";
export type SortDirection = "asc" | "desc";
export type TimeRange = "all" | "lastMonth" | "lastWeek";
export const useTopPerformers = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("sales");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [employees, setEmployees] = useState<EmployeePerformance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>("all");
  const fetchData = useCallback(async (url: string): Promise<void> => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setErrorMessage(
          "Failed to load employee performance data. Please try again later."
        );
        return;
      }
      const data = (await response.json()) as EmployeePerformance[];
      setEmployees(data);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(
        "Failed to load employee performance data. Please try again later."
      );
      console.error("Error fetching employee performance:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const buildUrl = (): string => {
      let url = `http://localhost:8080/api/performance/top-performers?sortBy=${sortField}&sortDirection=${sortDirection}`;

      if (timeRange === "lastMonth") {
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(today.getMonth() - 1);

        url += `&startDate=${lastMonth.toISOString().split("T")[0]}&endDate=${
          today.toISOString().split("T")[0]
        }`;
      } else if (timeRange === "lastWeek") {
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);

        url += `&startDate=${lastWeek.toISOString().split("T")[0]}&endDate=${
          today.toISOString().split("T")[0]
        }`;
      } else if (timeRange === "all") {
        url += `&includeAllData=true`;
      }

      return url;
    };

    fetchData(buildUrl());
  }, [sortField, sortDirection, timeRange, fetchData]);

  const handleSearch = useCallback(async (): Promise<void> => {
    if (!searchQuery.trim()) {
      const buildUrl = (): string => {
        let url = `http://localhost:8080/api/performance/top-performers?sortBy=${sortField}&sortDirection=${sortDirection}`;

        if (timeRange === "lastMonth") {
          const today = new Date();
          const lastMonth = new Date();
          lastMonth.setMonth(today.getMonth() - 1);

          url += `&startDate=${lastMonth.toISOString().split("T")[0]}&endDate=${
            today.toISOString().split("T")[0]
          }`;
        } else if (timeRange === "lastWeek") {
          const today = new Date();
          const lastWeek = new Date();
          lastWeek.setDate(today.getDate() - 7);

          url += `&startDate=${lastWeek.toISOString().split("T")[0]}&endDate=${
            today.toISOString().split("T")[0]
          }`;
        } else if (timeRange === "all") {
          url += `&includeAllData=true`;
        }

        return url;
      };

      await fetchData(buildUrl());
      return;
    }

    let searchUrl = `http://localhost:8080/api/performance/search?query=${encodeURIComponent(
      searchQuery
    )}`;

    if (timeRange === "lastMonth") {
      const today = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);

      searchUrl += `&startDate=${
        lastMonth.toISOString().split("T")[0]
      }&endDate=${today.toISOString().split("T")[0]}`;
    } else if (timeRange === "lastWeek") {
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);

      searchUrl += `&startDate=${
        lastWeek.toISOString().split("T")[0]
      }&endDate=${today.toISOString().split("T")[0]}`;
    } else if (timeRange === "all") {
      searchUrl += `&includeAllData=true`;
    }

    await fetchData(searchUrl);
  }, [searchQuery, sortField, sortDirection, timeRange, fetchData]);

  const handleSort = useCallback((field: SortField): void => {
    setSortField((prevField) => {
      setSortDirection((prevDirection) => {
        if (prevField === field) {
          return prevDirection === "asc" ? "desc" : "asc";
        }
        return "desc";
      });
      return field;
    });
  }, []);

  const formatCurrency = useCallback((amount: number): string => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }, []);

  return {
    employees,
    loading,
    errorMessage,
    searchQuery,
    sortField,
    sortDirection,
    timeRange,
    setSearchQuery,
    setTimeRange,
    setErrorMessage,
    handleSearch,
    handleSort,
    formatCurrency,
  };
};