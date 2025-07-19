import { useState, useEffect } from "react";
import axios from "axios";
import { Employee } from "../models/Employees";
import { ShiftData } from "../models/Shift";
import { AttendanceDTO } from "../models/Attendance";

export const useShiftDetailData = (employee: Employee) => {
  const [shifts, setShifts] = useState<ShiftData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch attendance data for the employee
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/attendances/employee/${employee.id}`);
        
        // Transform attendance data to shift data format
        const transformedShifts = response.data.map((attendance: AttendanceDTO) => {
          // Determine shift type based on clock-in time
          const clockInHour = parseInt(attendance.clockIn?.split(':')[0] || "0", 10);
          let shiftType = "Regular Shift";
          
          if (clockInHour >= 5 && clockInHour < 12) {
            shiftType = "Morning Shift";
          } else if (clockInHour >= 12 && clockInHour < 17) {
            shiftType = "Afternoon Shift";
          } else if (clockInHour >= 17 && clockInHour < 22) {
            shiftType = "Evening Shift";
          } else {
            shiftType = "Night Shift";
          }
          
          // Use breakTime from backend
          const breakTime = attendance.breakTime || "00:00:00";
          
          return {
            shiftType,
            startTime: attendance.clockIn || "N/A",
            endTime: attendance.clockOut || "N/A",
            break: breakTime,
            otHours: attendance.otHours || "00:00:00",
            location: employee.location,
            totalHours: attendance.totalHours || "00:00:00",
            orders: "N/A", // Orders data not available in current backend model
            date: attendance.date // Store the date from attendance
          };
        });
        
        setShifts(transformedShifts);
        setError(null);
      } catch (err) {
        console.error("Error fetching attendance data:", err);
        setError("Failed to load shift data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (employee && employee.id) {
      fetchAttendanceData();
    }
  }, [employee]);

  return { shifts, loading, error };
};