import React from "react";
import { EmployeePerformance } from "../../../models/Performance";
import PerformanceSorting from "./PerformanceSorting";
import { SortField, SortDirection } from "../../../hooks/useTopPerformers";

interface PerformanceTableProps {
  employees: EmployeePerformance[];
  loading: boolean;
  sortField: SortField;
  sortDirection: SortDirection;
  handleSort: (field: SortField) => void;
  formatCurrency: (amount: number) => string;
}

const PerformanceTable: React.FC<PerformanceTableProps> = ({
  employees,
  loading,
  sortField,
  sortDirection,
  handleSort
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 50;
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const paginatedData = employees.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="table-container">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th style={{ width: "15%" }}>Employee ID</th>
                <th style={{ width: "20%" }}>Employee NAME</th>
                <th style={{ width: "15%" }}>Role</th>
                <PerformanceSorting
                  title="Orders"
                  field="orders"
                  currentSortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  width="16%"
                />
                <PerformanceSorting
                  title="Sales"
                  field="sales"
                  currentSortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  width="19%"
                />
                <PerformanceSorting
                  title="Working Hours"
                  field="workinghours"
                  currentSortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  width="16%"
                />
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty-table-message">
                    No employees found
                  </td>
                </tr>
              ) : (
                paginatedData.map((employee, idx) => (
                  <tr key={employee.id}>
                    <td>{(currentPage - 1) * rowsPerPage + idx + 1}</td>
                    <td>{employee.id}</td>
                    <td>
                      <div className="employee-name-cell">
                        <div className="avatar">
                          {employee.avatar ? (
                            <img src={employee.avatar} alt={employee.name} />
                          ) : (
                            <div className="avatar-fallback">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span>{employee.name}</span>
                      </div>
                    </td>
                    <td>{employee.role}</td>
                    <td>{employee.totalOrders} orders</td>
                    <td>{`Rs.${Number(employee.totalSales).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</td>
                    <td>{employee.workingHours}</td>
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
          
        </>
      )}
    </div>
  );
};

export default PerformanceTable;