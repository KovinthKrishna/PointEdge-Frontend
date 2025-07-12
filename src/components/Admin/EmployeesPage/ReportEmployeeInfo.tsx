// filepath: c:\Users\DELL\Desktop\PointEdge-Frontend\src\components\Admin\EmployeesPage\ShiftReportEmployeeInfo.tsx
import React from 'react';
import { Employee } from '../../../models/Employees';

interface ShiftReportEmployeeInfoProps {
  employee: Employee;
}

const ReportEmployeeInfo: React.FC<ShiftReportEmployeeInfoProps> = ({ employee }) => {
  return (
    <div className="employee-info">
      <div className="employee-avatar">
        <img
          src={employee?.avatar || "https://bit.ly/default-avatar"}
          alt="Employee profile"
        />
      </div>

      <div className="employee-details">
        <div className="detail-grid">
          <div className="detail-label">Name</div>
          <div className="detail-value">: {employee?.name}</div>
          <div className="detail-label">ID</div>
          <div className="detail-value">: {employee?.id}</div>
          <div className="detail-label">Role</div>
          <div className="detail-value">: {employee?.role}</div>
        </div>
      </div>
    </div>
  );
};

export default ReportEmployeeInfo;