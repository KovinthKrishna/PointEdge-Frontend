import React from "react";
import clockIcon from "../../../assets/clock-icon.png";
import { useShiftReportData } from "../../../hooks/useShiftReportdata";
import ShiftReportEmployeeTable from "./ShiftEmployeeTable";
import ShiftReport2Page from "./ShiftReport2Page";
import ShiftReportSearchBar from "./ShiftSearchbar";
import ShiftReportStatCard from "./ShiftStatCard";
import "./styles/ShiftReport1.css";

const ShiftReport1Page: React.FC = () => {
  const {
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
    handleBackClick,
  } = useShiftReportData();

  if (showDetailedReport && selectedEmployee) {
    // Convert id to string to match ShiftReport2Page's expected type
    const employeeForDetailView = {
      ...selectedEmployee,
      id: selectedEmployee.id.toString(),
    };

    return (
      <ShiftReport2Page
        employee={employeeForDetailView}
        onBackClick={handleBackClick}
      />
    );
  }

  return (
    <div className="shift-report-container">
      <div className="shift-report-content">
        <div className="stats-grid">
          <ShiftReportStatCard
            icon={
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvFMn2nGymlFQAfR9KgpQ1EY52G6bsqM8azQ&s"
                alt="Shift Icon"
                className="stat-icon"
              />
            }
            title="Total Shifts"
            value={statsLoading ? "Loading..." : totalShifts.toString()}
          />
          <ShiftReportStatCard
            icon={<img src={clockIcon} alt="Time Icon" className="stat-icon" />}
            title="Total Working Hours"
            value={statsLoading ? "Loading..." : totalHours} // ✅ Using backend data
          />
          <ShiftReportStatCard
            icon={
              <img
                src="https://cdn-icons-png.flaticon.com/512/8997/8997159.png"
                alt="Calendar Icon"
                className="stat-icon"
              />
            }
            title="Working Days"
            value={statsLoading ? "Loading..." : workingDays.toString()}
          />
        </div>

        <ShiftReportSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

        <ShiftReportEmployeeTable
          employees={employees || []}
          loading={loading}
          error={error}
          onViewClick={handleViewClick}
        />
      </div>
    </div>
  );
};

export default ShiftReport1Page;