import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Employee } from "../models/Employees";

export const useShiftReportData = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showDetailedReport, setShowDetailedReport] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalShifts, setTotalShifts] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<string>("0h");
  const [workingDays, setWorkingDays] = useState<number>(0);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);

  // Fetch employees data from backend
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/employees");
      
      // Transform the data to match your UI requirements
      const transformedEmployees = response.data.map((emp: any, index: number) => ({
        id: emp.id,
        name: emp.name,
        role: emp.role || "Unknown",
        avatar: emp.avatar || "",
        status: emp.status || "Active",
        location: emp.location || `Store ${(index % 3) + 1}`,
        isFirstRow: index === 0
      }));
      
      setEmployees(transformedEmployees);
      setError(null);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to load employee data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch attendance stats
  const fetchAttendanceStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      
      // Get the first and last day of current month for filtering
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const startDate = firstDay.toISOString().split('T')[0];
      const endDate = now.toISOString().split('T')[0];
      
      const attendanceResponse = await axios.get(
        `http://localhost:8080/api/attendances?startDate=${startDate}&endDate=${endDate}`
      );
      const attendanceData = attendanceResponse.data;
      
      // Calculate summary statistics
      setTotalShifts(attendanceData.length);
      
      // Calculate total hours
      let totalMinutes = 0;
      attendanceData.forEach((attendance: any) => {
        if (attendance.totalHours) {
          const timeParts = attendance.totalHours.split(':');
          if (timeParts.length >= 2) {
            totalMinutes += parseInt(timeParts[0]) * 60;
            totalMinutes += parseInt(timeParts[1]);
          }
        }
      });
      
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      setTotalHours(minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`);
      
      // Calculate working days (unique dates)
      const uniqueDates = new Set(
        attendanceData.map((attendance: any) => attendance.date?.split('T')[0])
          .filter((date: string | undefined) => date)
      );
      setWorkingDays(uniqueDates.size);
    } catch (err) {
      console.error("Error fetching attendance summary:", err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Initial data loading
  useEffect(() => {
    fetchEmployees();
    fetchAttendanceStats();
  }, [fetchEmployees, fetchAttendanceStats]);

  // Search functionality
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      fetchEmployees();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/employees/search?query=${searchQuery}`);
      
      const transformedEmployees = response.data.map((emp: any, index: number) => ({
        id: emp.id,
        name: emp.name,
        role: emp.role || "Unknown",
        avatar: emp.avatar || "",
        status: emp.status || "Active",
        location: emp.location || `Store ${(index % 3) + 1}`,
        isFirstRow: index === 0
      }));
      
      setEmployees(transformedEmployees);
      setError(null);
    } catch (err) {
      console.error("Error searching employees:", err);
      setError("Failed to search employees. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, fetchEmployees]);

  const handleViewClick = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDetailedReport(true);
  }, []);

  const handleBackClick = useCallback(() => {
    setShowDetailedReport(false);
    setSelectedEmployee(null);
  }, []);

  return {
    employees,
    loading,
    error,
    selectedEmployee,
    showDetailedReport,
    searchQuery,
    setSearchQuery,
    totalShifts,
    totalHours,
    workingDays,
    statsLoading,
    handleSearch,
    handleViewClick,
    handleBackClick
  };
};