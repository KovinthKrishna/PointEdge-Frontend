import React from 'react';
import { ShiftData } from '../../../models/Shift';

interface ShiftReportDetailCardProps {
  shift: ShiftData;
}

const Reportdetailcard: React.FC<ShiftReportDetailCardProps> = ({ shift }) => {
  return (
    <div className="shift-card">
      <div className="shift-header">
        <div>{shift.shiftType}</div>
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
                <div className="detail-value">{shift.orders}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Notes */}
        <div className="shift-column">
          <div className="notes-container">
            <div className="notes-header">Notes</div>
            <div className="notes-content">
              {shift.shiftType} at {shift.location} on {new Date(shift.date).toLocaleDateString()}. 
              Total working time: {shift.totalHours} including {shift.otHours} overtime.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportdetailcard;