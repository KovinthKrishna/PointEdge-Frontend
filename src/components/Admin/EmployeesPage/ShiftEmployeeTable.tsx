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
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 50;
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const paginatedData = employees.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
            <th>#</th>
            <th>Employee ID</th>
            <th>Employee name</th>
            <th>Role</th>
            <th>Location</th>
            <th>Detailed Report</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-table-message">No employees found</td>
            </tr>
          ) : (
            paginatedData.map((employee, index) => (
              <tr key={`${employee.id}-${index}`}>
                <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
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
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ShiftEmployeeTable;