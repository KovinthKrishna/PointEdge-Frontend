import { useState, useEffect } from "react";
import { Employee } from "../models/Employees";
import { ShiftData } from "../models/Shift";
import { getEmployeeShiftReport } from "../services/employeeService";

export const useShiftDetailData = (employee: Employee) => {
  const [shifts, setShifts] = useState<ShiftData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShiftData = async () => {
      try {
        setLoading(true);
        
        const response = await getEmployeeShiftReport(employee.id);
        
        //Transform shift report data to match ShiftData interface
        const transformedShifts = response.map((shiftReport: any) => ({
  
          employeeId: shiftReport.employeeId,
          employeeName: shiftReport.employeeName,
          role: shiftReport.role,
          shiftDate: shiftReport.shiftDate,
          clockIn: shiftReport.clockIn,
          clockOut: shiftReport.clockOut,
          otHours: shiftReport.otHours || "00:00:00",
          workingHours: shiftReport.workingHours || "00:00:00",
          shiftType: shiftReport.shiftType || "Regular Shift",
          totalOrders: shiftReport.totalOrders || 0,
          totalSales: shiftReport.totalSales || 0.0,
          totalWorkingHours: shiftReport.totalWorkingHours || "00:00:00",
          startTime: shiftReport.clockIn || "N/A",
          endTime: shiftReport.clockOut || "N/A",
          break: "00:30:00", 
          totalHours: shiftReport.workingHours || "00:00:00",
          orders: shiftReport.totalOrders?.toString() || "0",
          date: shiftReport.shiftDate || new Date().toISOString().split('T')[0]
        }));
        
        setShifts(transformedShifts);
        setError(null);
      } catch (err) {
        console.error("Error fetching shift data:", err);
        setError("Failed to load shift data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (employee && employee.id) {
      fetchShiftData();
    }
  }, [employee]);

  return { shifts, loading, error };
};