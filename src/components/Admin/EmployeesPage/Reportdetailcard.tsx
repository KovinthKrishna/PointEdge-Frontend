import React from 'react';
import { ShiftData } from '../../../models/Shift';

interface ShiftReportDetailCardProps {
  shift: ShiftData;
}

const Reportdetailcard: React.FC<ShiftReportDetailCardProps> = ({ shift }) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Format time to HH:mm:ss (no milliseconds)
  const formatTime = (timeString: string) => {
    if (!timeString) return "N/A";
    // If ISO string, extract time part
    if (timeString.includes("T")) {
      const timePart = timeString.split("T")[1];
      return timePart ? timePart.substring(0, 8) : timeString;
    }
    // If already in HH:mm:ss or HH:mm format
    return timeString.substring(0, 8);
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


            <div className="shift-detail-item">
              <div className="detail-number">3</div>
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
            {/* Orders and Sales columns removed as requested */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportdetailcard;