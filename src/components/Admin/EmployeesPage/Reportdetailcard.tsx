import React from 'react';
import { ShiftData } from '../../../models/Shift';

interface ShiftReportDetailCardProps {
  shift: ShiftData;
}

const Reportdetailcard: React.FC<ShiftReportDetailCardProps> = ({ shift }) => {
  // ✅ Format date for display
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // ✅ Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="shift-card">
      <div className="shift-header">
        <div>{shift.shiftType}</div>
        <div className="shift-date">{formatDate(shift.date)}</div>
      </div>

      <div className="shift-details-grid">
        {/* Left Column */}
        <div className="shift-column">
          <div className="shift-detail-grid">
            <div className="shift-detail-item">
              <div className="detail-number">1</div>
              <div className="detail-content">
                <div className="detail-label">Start Time:</div>
                <div className="detail-value">{shift.startTime}</div>
              </div>
            </div>

            <div className="shift-detail-item">
              <div className="detail-number">2</div>
              <div className="detail-content">
                <div className="detail-label">End Time:</div>
                <div className="detail-value">{shift.endTime}</div>
              </div>
            </div>

            <div className="shift-detail-item">
              <div className="detail-number">3</div>
              <div className="detail-content">
                <div className="detail-label">Break:</div>
                <div className="detail-value">{shift.break}</div>
              </div>
            </div>

            <div className="shift-detail-item">
              <div className="detail-number">4</div>
              <div className="detail-content">
                <div className="detail-label">Location:</div>
                <div className="detail-value">{shift.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="shift-column">
          <div className="shift-detail-grid">
            <div className="shift-detail-item">
              <div className="detail-number">5</div>
              <div className="detail-content">
                <div className="detail-label">OT Hours:</div>
                <div className="detail-value">{shift.otHours}</div>
              </div>
            </div>

            <div className="shift-detail-item">
              <div className="detail-number">6</div>
              <div className="detail-content">
                <div className="detail-label">Total Hours:</div>
                <div className="detail-value">{shift.totalHours}</div>
              </div>
            </div>

            <div className="shift-detail-item">
              <div className="detail-number">7</div>
              <div className="detail-content">
                <div className="detail-label">Orders:</div>
                <div className="detail-value">{shift.totalOrders}</div>
              </div>
            </div>

            {/* ✅ Add sales information */}
            <div className="shift-detail-item">
              <div className="detail-number">8</div>
              <div className="detail-content">
                <div className="detail-label">Sales:</div>
                <div className="detail-value">{formatCurrency(shift.totalSales)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Notes */}
        <div className="shift-column">
          <div className="notes-container">
            <div className="notes-header">Performance Summary</div>
            <div className="notes-content">
              {shift.shiftType} at {shift.location} on {formatDate(shift.date)}. 
              <br />
              Working time: {shift.totalHours} including {shift.otHours} overtime.
              <br />
              Performance: {shift.totalOrders} orders, {formatCurrency(shift.totalSales)} in sales.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportdetailcard;