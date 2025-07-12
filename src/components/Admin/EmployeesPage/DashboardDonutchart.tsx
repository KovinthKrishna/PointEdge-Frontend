import React from 'react';

interface DashboardDonutChartProps {
  activePercentage: number;
  leavePercentage: number;
}

const DashboardDonutChart: React.FC<DashboardDonutChartProps> = ({
  activePercentage,
  leavePercentage
}) => {
  return (
    <div className="bg-white rounded-md p-4 border border-gray-200">
      <div className="flex justify-between mb-4">
        <div className="font-medium">Attendance Report</div>
      </div>
      <div className="relative flex justify-center donut-container">
        {/* donut chart - use real percentages */}
        <div className="donut-chart">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#2C5282"
              strokeWidth="20"
              strokeDasharray={`${activePercentage * 2.51} 251.3`}
              transform="rotate(-90 50 50)"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#B8B8B8"
              strokeWidth="20"
              strokeDasharray={`${leavePercentage * 2.51} 251.3`}
              strokeDashoffset={`-${activePercentage * 2.51}`}
              transform="rotate(-90 50 50)"
            />
            <circle cx="50" cy="50" r="20" fill="white" />
          </svg>
        </div>
      </div>
      <div className="flex justify-center mt-4 text-xs">
        <div className="flex items-center mr-4">
          <div className="donut-indicator donut-indicator-active"></div>
          <div>Active ({activePercentage}%)</div>
        </div>
        <div className="flex items-center mr-4">
          <div className="donut-indicator donut-indicator-leave"></div>
          <div>Leave ({leavePercentage}%)</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDonutChart;