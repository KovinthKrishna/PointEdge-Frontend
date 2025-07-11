import React from 'react';

interface ShiftReportStatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const ShiftStatCard: React.FC<ShiftReportStatCardProps> = ({ icon, title, value }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon-container">{icon}</div>
      </div>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-help-text">
        stats in this month
      </div>
    </div>
  );
};

export default ShiftStatCard;