import React from 'react';
import { ShiftData } from '../../../models/Shift';
import { Employee } from '../../../models/Employees';

interface ShiftReportEmployeeInfoProps {
  shift: ShiftData;
  employee: Employee;
}

const ReportEmployeeInfo: React.FC<ShiftReportEmployeeInfoProps> = ({ shift, employee }) => {
  return (
    <div className="employee-info-flex" style={{ display: 'flex', alignItems: 'center' }}>
      <div
        className="employee-avatar"
        style={{
          marginLeft: '150px', // moves avatar to the right from the left edge
          marginRight: '60px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          src={employee.avatar || "https://bit.ly/default-avatar"}
          alt="Employee profile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%'
          }}
        />
      </div>

      <div className="employee-details">
        <div className="detail-grid">
          <div className="detail-label">Name</div>
          <div className="detail-value">: {shift.employeeName}</div>
          <div className="detail-label">ID</div>
          <div className="detail-value">: {shift.employeeId}</div>
          <div className="detail-label">Role</div>
          <div className="detail-value">: {shift.role}</div>
          <div className="detail-label">Total Orders</div>
          <div className="detail-value">: {shift.totalOrders}</div>
          <div className="detail-label">Total Sales</div>
          <div className="detail-value">: Rs.{Number(shift.totalSales).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      </div>
    </div>
  );
};

export default ReportEmployeeInfo;