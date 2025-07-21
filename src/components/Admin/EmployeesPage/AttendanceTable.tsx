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
  const rowsPerPage = 25;
  const totalPages = Math.ceil(employeeAttendances.length / rowsPerPage);
  
 
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [employeeAttendances.length, totalPages]);
  
  const safePage = totalPages > 0 ? Math.min(Math.max(currentPage, 1), totalPages) : 1;
  
  // Calculate pagination with safePage
  const startIndex = (safePage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, employeeAttendances.length);
  const paginatedData = employeeAttendances.slice(startIndex, endIndex);

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
                  <tr key={`${attendance.id}-${startIndex + idx}`}>
                    <td>{startIndex + idx + 1}</td>
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
          
          {totalPages > 1 && (
            <div className="pagination-controls">
              
              <button 
                className="pagination-button"
                onClick={() => setCurrentPage(1)} 
                disabled={safePage === 1}
                title="First Page"
              >
                &laquo;
              </button>
              
              <button 
                className="pagination-button"
                onClick={() => setCurrentPage(safePage - 1)} 
                disabled={safePage === 1}
                title="Previous Page"
              >
                &lsaquo;
              </button>

              {(() => {
                const pages = [];
                const startPage = Math.max(1, safePage - 2);
                const endPage = Math.min(totalPages, safePage + 2);

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      className={`pagination-button ${i === safePage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </button>
                  );
                }
                return pages;
              })()}
           
              <button 
                className="pagination-button"
                onClick={() => setCurrentPage(safePage + 1)} 
                disabled={safePage === totalPages}
                title="Next Page"
              >
                &rsaquo;
              </button>

              <button 
                className="pagination-button"
                onClick={() => setCurrentPage(totalPages)} 
                disabled={safePage === totalPages}
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