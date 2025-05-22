import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/ShiftReport2.css";

// Define types for props and data
interface Employee {
  id: string | number;
  name: string;
  avatar: string;
  role: string;
  location: string;
  isFirstRow?: boolean;
}

interface Attendance {
  employeeId: number;
  employeeName: string;
  role: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  otHours: string;
  status: string;
  avatar: string;
  date: string;
}

interface ShiftData {
  shiftType: string;
  startTime: string;
  endTime: string;
  break: string;
  otHours: string;
  location: string;
  totalHours: string;
  orders: string;
  date: string; // Added date property
}

interface ShiftReport2PageProps {
  employee: Employee;
  onBackClick: () => void;
}

export default function ShiftReport2Page({ employee, onBackClick }: ShiftReport2PageProps) {
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
        const transformedShifts = response.data.map((attendance: Attendance) => {
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
          
          // Estimate break time (not stored in backend, so using a default)
          const breakTime = "00:30:00";
          
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

  // Inline styles to ensure back button visibility
  const navBarStyle = {
    display: "flex",
    padding: "16px",
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%"
  };

  const backButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: "#ffffff",
    border: "1px solid #003049",
    borderRadius: "4px",
    color: "#003049",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s"
  };

  return (
    <div className="shift-report-container">
      {/* Top Navigation with inline styles */}
      <div style={navBarStyle}>
        <div>
          <button 
            onClick={onBackClick} 
            style={backButtonStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="report-header">
        <h1>Shift Report</h1>
      </div>

      {/* Employee Info */}
      <div className="container">
        <div className="employee-info">
          <div className="employee-avatar">
            <img
              src={employee?.avatar || "https://bit.ly/default-avatar"}
              alt="Employee profile"
            />
          </div>

          <div className="employee-details">
            <div className="detail-grid">
              <div className="detail-label">Name</div>
              <div className="detail-value">: {employee?.name}</div>
              <div className="detail-label">ID</div>
              <div className="detail-value">: {employee?.id}</div>
              <div className="detail-label">Role</div>
              <div className="detail-value">: {employee?.role}</div>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && <div className="loading-message">Loading shift data...</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Shift Details Blocks */}
        <div className="shifts-container">
          {!loading && !error && shifts.length > 0 ? (
            shifts.map((shift, index) => (
              <div key={index} className="shift-card">
                <div className="shift-header">
                  <div>{shift.shiftType}</div>
                </div>

                <div className="shift-details-grid">
                  {/* Left Column */}
                  <div className="shift-column">
                    <div className="shift-detail-grid">
                      <div className="shift-detail-item">
                        <div className="detail-number">1</div>
                        <div className="detail-content">
                          <div className="detail-label">Start Time:</div>
                          <div className="detail-value">{shift.startTime}</div>
                        </div>
                      </div>

                      <div className="shift-detail-item">
                        <div className="detail-number">2</div>
                        <div className="detail-content">
                          <div className="detail-label">End Time:</div>
                          <div className="detail-value">{shift.endTime}</div>
                        </div>
                      </div>

                      <div className="shift-detail-item">
                        <div className="detail-number">3</div>
                        <div className="detail-content">
                          <div className="detail-label">Break:</div>
                          <div className="detail-value">{shift.break}</div>
                        </div>
                      </div>

                      <div className="shift-detail-item">
                        <div className="detail-number">4</div>
                        <div className="detail-content">
                          <div className="detail-label">Location:</div>
                          <div className="detail-value">{shift.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column */}
                  <div className="shift-column">
                    <div className="shift-detail-grid">
                      <div className="shift-detail-item">
                        <div className="detail-number">5</div>
                        <div className="detail-content">
                          <div className="detail-label">OT Hours:</div>
                          <div className="detail-value">{shift.otHours}</div>
                        </div>
                      </div>

                      <div className="shift-detail-item">
                        <div className="detail-number">6</div>
                        <div className="detail-content">
                          <div className="detail-label">Total Hours:</div>
                          <div className="detail-value">{shift.totalHours}</div>
                        </div>
                      </div>

                      <div className="shift-detail-item">
                        <div className="detail-number">7</div>
                        <div className="detail-content">
                          <div className="detail-label">Orders:</div>
                          <div className="detail-value">{shift.orders}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Notes */}
                  <div className="shift-column">
                    <div className="notes-container">
                      <div className="notes-header">Notes</div>
                      <div className="notes-content">
                        {shift.shiftType} at {shift.location} on {new Date(shift.date).toLocaleDateString()}. 
                        Total working time: {shift.totalHours} including {shift.otHours} overtime.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && !error && (
              <div className="no-shifts">
                <div>No shift data available for this employee</div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}