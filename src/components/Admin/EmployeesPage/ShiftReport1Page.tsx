import { useState, useEffect } from "react";
import axios from "axios";
import type React from "react";
import ShiftReport2Page from "./ShiftReport2Page";
import clockIcon from "../../../assets/clock-icon.png";
import "./styles/ShiftReport1.css";

// Define the Employee interface with all required properties
interface Employee {
  id: number;
  name: string;
  avatar: string;
  role: string;
  status: string;
  location: string;
  isFirstRow?: boolean; // Optional UI property
}

const ShiftReport1Page: React.FC = () => {
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
  useEffect(() => {
    const fetchEmployees = async () => {
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
          location: emp.location || `Store ${(index % 3) + 1}`, // Use actual location if available
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
    };

    fetchEmployees();
  }, []);

  // Separate useEffect for fetching attendance stats
  useEffect(() => {
    const fetchAttendanceStats = async () => {
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
        // Keep default values for stats
      } finally {
        setStatsLoading(false);
      }
    };

    fetchAttendanceStats();
  }, []);

  // Search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search is empty, fetch all employees
      try {
        const response = await axios.get("http://localhost:8080/api/employees");
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
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employee data. Please try again later.");
      }
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
  };

  const handleViewClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDetailedReport(true);
  };

  const handleBackClick = () => {
    setShowDetailedReport(false);
    setSelectedEmployee(null);
  };

  // If detailed report is being shown, render the ShiftReport2Page component
  if (showDetailedReport && selectedEmployee) {
    // Convert id to string to match ShiftReport2Page's expected type
    const employeeForDetailView = {
      ...selectedEmployee,
      id: selectedEmployee.id.toString()
    };
    
    return <ShiftReport2Page 
      employee={employeeForDetailView} 
      onBackClick={handleBackClick} 
    />;
  }

  return (
    <div className="shift-report-container">
      <div className="shift-report-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <StatCard
            icon={
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvFMn2nGymlFQAfR9KgpQ1EY52G6bsqM8azQ&s"
                alt="Shift Icon"
                className="stat-icon"
              />
            }
            title="Total Shifts"
            value={totalShifts.toString()}
          />
          <StatCard
            icon={<img src={clockIcon} alt="Time Icon" className="stat-icon" />}
            title="Total Working Hours"
            value={totalHours}
          />
          <StatCard
            icon={
              <img
                src="https://cdn-icons-png.flaticon.com/512/8997/8997159.png"
                alt="Calender Icon"
                className="stat-icon"
              />
            }
            title="Working Days"
            value={workingDays.toString()}          
          />
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="input-group">
            <div className="input-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#A0AEC0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, role, etc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Loading and Error States */}
        {loading && <div className="loading-message">Loading employee data...</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Employee Shift Table */}
        {!loading && !error && (
          <div className="table-container">
            <table className="shift-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee name</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Detailed Report</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={`${employee.id}-${index}`}>
                    <td>{employee.id}</td>
                    <td>
                      <span className="employee-name">{employee.name}</span>
                    </td>
                    <td>{employee.role}</td>
                    <td>{employee.location}</td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => handleViewClick(employee)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon-container">{icon}</div>
      </div>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-help-text">
        stats in this month
      </div>
    </div>
  );
};

export default ShiftReport1Page;