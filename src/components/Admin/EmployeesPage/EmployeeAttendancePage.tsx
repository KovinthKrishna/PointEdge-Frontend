import React, { ErrorInfo, ReactNode } from 'react';
import './styles/EmployeeAttendance.css';
import { useAttendanceData } from '../../../hooks/useAttendancedata';
import AttendanceWorkHour from './AttendanceWorkHour';
import AttendanceSearchBar from './AttendanceSearchBar';
import AttendanceTable from './AttendanceTable';

// Simple error boundary component
class ErrorBoundary extends React.Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-fallback">Something went wrong. Please try again later.</div>;
    }

    return this.props.children;
  }
}

// Inline Toast component
interface ToastProps {
  title: string;
  message: string;
  type: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, message, type, onClose }) => {
  return (
    <div className={`toast toast-${type}`}>
      <div className="font-medium">{title}</div>
      <div>{message}</div>
      <button 
        className="toast-close-button"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

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
    toastMessage,
    setToastMessage,
    handleSearch,
    getInitials
  } = useAttendanceData();

  return (
    <div className="attendance-container">
      <div className="attendance-content">
        {/* Work Hour Section */}
        <AttendanceWorkHour
          date={date}
          setDate={setDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />

        {/* Search Section */}
        <AttendanceSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          loading={loading}
        />

        {/* Table with Error Boundary */}
        <ErrorBoundary>
          <AttendanceTable
            employeeAttendances={employeeAttendances}
            loading={loading}
            getInitials={getInitials}
          />
        </ErrorBoundary>

        {/* Toast notification */}
        {toastMessage && (
          <Toast
            title={toastMessage.title}
            message={toastMessage.message}
            type={toastMessage.type}
            onClose={() => setToastMessage(null)}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendancePage;