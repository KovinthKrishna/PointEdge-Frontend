import { useState } from "react";
import type React from "react";
import ShiftReport2Page from "./ShiftReport2Page";
import clockIcon from "../../../assets/clock-icon.png";
import "./styles/ShiftReport1.css";

// Sample data for the shift report
const employeeData = [
  {
    id: "2236767",
    name: "Devon Lane",
    avatar: "https://bit.ly/ryan-florence",
    role: "Cashier",
    location: "Store 1",
    isFirstRow: true,
  },
  {
    id: "2377373",
    name: "Eleanor Pena",
    avatar: "https://bit.ly/kent-c-dodds",
    role: "Cashier",
    location: "Store 1",
    isFirstRow: false,
  },
  {
    id: "2345657",
    name: "Floyd Miles",
    avatar: "https://bit.ly/prosper-baba",
    role: "Cashier",
    location: "Store 2",
    isFirstRow: false,
  },
  {
    id: "2435412",
    name: "Annette Black",
    avatar: "https://bit.ly/code-beast",
    role: "Cashier",
    location: "Store 3",
    isFirstRow: false,
  },
  {
    id: "2435412",
    name: "Annette Black",
    avatar: "https://bit.ly/code-beast",
    role: "Cashier",
    location: "Store 3",
    isFirstRow: false,
  },
  {
    id: "2377373",
    name: "Eleanor Pena",
    avatar: "https://bit.ly/kent-c-dodds",
    role: "Cashier",
    location: "Store 1",
    isFirstRow: false,
  },
];

const ShiftReport1Page: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showDetailedReport, setShowDetailedReport] = useState<boolean>(false);

  const handleViewClick = (employee: any) => {
    setSelectedEmployee(employee);
    setShowDetailedReport(true);
  };

  const handleBackClick = () => {
    setShowDetailedReport(false);
    setSelectedEmployee(null);
  };

  // If detailed report is being shown, render the ShiftReport2Page component
  if (showDetailedReport && selectedEmployee) {
    return <ShiftReport2Page employee={selectedEmployee} onBackClick={handleBackClick} />;
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
            value="556"
            change={10}
          />
          <StatCard
            icon={
              <img
                src={clockIcon}
                alt="Time Icon"
                className="stat-icon"
              />
            }
            title="Total Working Hours"
            value="160h"
            change={10}
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
            value="10"
            change={10}
          />
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="input-group">
            <div className="input-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                  stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by type,time, or others..." 
            />
          </div>
          <button className="search-button">
            Search
          </button>
        </div>

        {/* Employee Shift Table */}
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
              {employeeData.map((employee, index) => (
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
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon-container">
          {icon}
        </div>
      </div>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-help-text">
        <span className="stat-arrow-up"></span>
        {change}% from last week
      </div>
    </div>
  );
};

export default ShiftReport1Page;