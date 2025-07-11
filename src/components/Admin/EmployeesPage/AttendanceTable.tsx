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
  return (
    <div className="box bg-white rounded-md overflow-hidden shadow-sm">
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
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
            {employeeAttendances.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-table-message">
                   No employees found
                </td>
              </tr>
            ) : (   
              employeeAttendances.map((attendance) => (
                <tr key={attendance.id}>
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
      )}
    </div>
  );
};

export default AttendanceTable;