import React from 'react';
import { ShiftData } from '../../../models/Shift';

interface ShiftReportDetailCardProps {
  shift: ShiftData;
}

const Reportdetailcard: React.FC<ShiftReportDetailCardProps> = ({ shift }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Format time to HH:mm:ss 
  const formatTime = (timeString: string) => {
    if (!timeString) return "N/A";
    if (timeString.includes("T")) {
      const timePart = timeString.split("T")[1];
      return timePart ? timePart.substring(0, 8) : timeString;
    }
  
    return timeString.substring(0, 8);
  };

  return (
    <div className="shift-card">
      <div className="shift-header">
        <div>{shift.shiftType}</div>
        <div className="shift-date">{formatDate(shift.date)}</div>
      </div>

      <div className="shift-details-grid">
        <div className="shift-column">
          <div className="shift-detail-grid">
            <div className="shift-detail-item">
              <div className="detail-number">1</div>
              <div className="detail-content">
                <div className="detail-label">Start Time:</div>
                <div className="detail-value">{formatTime(shift.startTime)}</div>
              </div>
            </div>

            <div className="shift-detail-item">
              <div className="detail-number">2</div>
              <div className="detail-content">
                <div className="detail-label">End Time:</div>
                <div className="detail-value">{formatTime(shift.endTime)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="shift-column">
          <div className="shift-detail-grid">
            <div className="shift-detail-item">
              <div className="detail-number">4</div>
              <div className="detail-content">
                <div className="detail-label">OT Hours:</div>
                <div className="detail-value">{shift.otHours}</div>
              </div>
            </div>

            <div className="shift-detail-item">
              <div className="detail-number">5</div>
              <div className="detail-content">
                <div className="detail-label">Total Hours:</div>
                <div className="detail-value">{shift.totalHours}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="shift-column">
          <div className="notes-container">
            <div className="notes-header">Performance Summary</div>
            <div className="notes-content">
              {shift.shiftType} on {formatDate(shift.date)}.
              <br />
              Working time: {shift.totalHours} including {shift.otHours} overtime.
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportdetailcard;