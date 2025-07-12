import React from 'react';
import { Employee } from '../../../models/Employees';

interface ShiftReportEmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  onViewClick: (employee: Employee) => void;
}

const ShiftEmployeeTable: React.FC<ShiftReportEmployeeTableProps> = ({
  employees,
  loading,
  error,
  onViewClick
}) => {
  if (loading) {
    return <div className="loading-message">Loading employee data...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  return (
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
          {employees.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-table-message">No employees found</td>
            </tr>
          ) : (
            employees.map((employee, index) => (
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
                    onClick={() => onViewClick(employee)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftEmployeeTable;