import React, { ErrorInfo, ReactNode } from "react";
import { useAttendanceData } from "../../../hooks/useAttendancedata";
import AttendanceSearchBar from "./AttendanceSearchBar";
import AttendanceTable from "./AttendanceTable";
import AttendanceWorkHour from "./AttendanceWorkHour";
import "./styles/EmployeeAttendance.css";


class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          Something went wrong. Please try again later.
        </div>
      );
    }

    return this.props.children;
  }
}


const EmployeeAttendancePage: React.FC = () => {
  const {
    employeeAttendances,
    loading,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    searchQuery,
    setSearchQuery,
    errorMessage,
    handleSearch,
    getInitials,
  } = useAttendanceData();

  // Fetch company start/end time from backend on mount
  React.useEffect(() => {
    const fetchCompanyHours = async () => {
      try {
        const response = await fetch("/api/company/hours");
        if (response.ok) {
          const data = await response.json();
          if (data.startTime) setStartTime(data.startTime);
          if (data.endTime) setEndTime(data.endTime);
        }
      } catch (err) {
        console.error("Failed to fetch company hours", err);
      }
    };
    fetchCompanyHours();
  }, [setStartTime, setEndTime]);

  return (
    <div className="attendance-container">
      <div className="attendance-content">
        
        <AttendanceWorkHour
          date={date}
          setDate={setDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />

        
        <AttendanceSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          loading={loading}
        />

        
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        
        <ErrorBoundary>
          <AttendanceTable
            employeeAttendances={employeeAttendances}
            loading={loading}
            getInitials={getInitials}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default EmployeeAttendancePage;
