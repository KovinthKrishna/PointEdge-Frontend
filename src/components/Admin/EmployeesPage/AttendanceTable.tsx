import React from 'react';
import { EmployeeAttendance } from '../../../models/Attendance';

interface AttendanceTableProps {
  employeeAttendances: EmployeeAttendance[];
  loading: boolean;
  getInitials: (name: string) => string;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({
  employeeAttendances,
  loading,
  getInitials
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 50;
  const totalPages = Math.ceil(employeeAttendances.length / rowsPerPage);
  const paginatedData = employeeAttendances.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="box bg-white rounded-md overflow-hidden shadow-sm">
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
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Role</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Total Hours</th>
                <th>OT Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="empty-table-message">
                     No employees found
                  </td>
                </tr>
              ) : (
                paginatedData.map((attendance, idx) => (
                  <tr key={attendance.id}>
                    <td>{(currentPage - 1) * rowsPerPage + idx + 1}</td>
                    <td>{attendance.id}</td>
                    <td>
                      <div className="flex align-center">
                        <div className="avatar">
                          {attendance.avatar ? (
                            <img src={attendance.avatar} alt={attendance.name} />
                          ) : (
                            <span className="avatar-fallback">{getInitials(attendance.name)}</span>
                          )}
                        </div>
                        <span>{attendance.name}</span>
                      </div>
                    </td>
                    <td>{attendance.role}</td>
                    <td>{attendance.clockIn}</td>
                    <td>{attendance.clockOut}</td>
                    <td>{attendance.totalHours}</td>
                    <td>{attendance.otHours}</td>
                    <td>
                      <div 
                        className={`badge ${attendance.status === "Active" ? "badge-active" : "badge-inactive"}`}
                      >
                        {attendance.status}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              {/* First Page Button */}
              <button 
                className="pagination-button"
                onClick={() => setCurrentPage(1)} 
                disabled={currentPage === 1}
                title="First Page"
              >
                &laquo;
              </button>
              
              {/* Previous Button */}
              <button 
                className="pagination-button"
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                disabled={currentPage === 1}
                title="Previous Page"
              >
                &lsaquo;
              </button>

              {/* Page Numbers */}
              {(() => {
                const pages = [];
                const startPage = Math.max(1, currentPage - 2);
                const endPage = Math.min(totalPages, currentPage + 2);

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      className={`pagination-button ${i === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </button>
                  );
                }
                return pages;
              })()}

              {/* Next Button */}
              <button 
                className="pagination-button"
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                disabled={currentPage === totalPages}
                title="Next Page"
              >
                &rsaquo;
              </button>

              {/* Last Page Button */}
              <button 
                className="pagination-button"
                onClick={() => setCurrentPage(totalPages)} 
                disabled={currentPage === totalPages}
                title="Last Page"
              >
                &raquo;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceTable;