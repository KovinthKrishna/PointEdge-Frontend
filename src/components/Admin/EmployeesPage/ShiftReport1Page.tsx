import React from "react";
import ShiftReport2Page from "./ShiftReport2Page";
import clockIcon from "../../../assets/clock-icon.png";
import "./styles/ShiftReport1.css";
import { useShiftReportData } from "../../../hooks/useShiftReportData";
import ShiftReportStatCard from "./ShiftStatCard";
import ShiftReportSearchBar from "./ShiftSearchbar";
import ShiftReportEmployeeTable from "./ShiftEmployeeTable";

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
    handleSearch,
    handleViewClick,
    handleBackClick
  } = useShiftReportData();

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
          <ShiftReportStatCard
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
          <ShiftReportStatCard
            icon={<img src={clockIcon} alt="Time Icon" className="stat-icon" />}
            title="Total Working Hours"
            value={totalHours}
          />
          <ShiftReportStatCard
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
        <ShiftReportSearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch} 
        />

        {/* Employee Shift Table */}
        <ShiftReportEmployeeTable 
          employees={employees}
          loading={loading}
          error={error}
          onViewClick={handleViewClick}
        />
      </div>
    </div>
  );
};

export default ShiftReport1Page;