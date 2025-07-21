import React from 'react';

interface DashboardDonutChartProps {
  activePercentage: number;
  inactivePercentage: number;
  suspendPercentage: number;
}

const DashboardDonutChart: React.FC<DashboardDonutChartProps> = ({
  activePercentage,
  inactivePercentage,
  suspendPercentage
}) => {
  const radius = 40;
  const strokeWidth = 20;
  const circleLength = 2 * Math.PI * radius;


  const activeLength = Math.round((activePercentage / 100) * circleLength * 1000) / 1000;
  const inactiveLength = Math.round((inactivePercentage / 100) * circleLength * 1000) / 1000;
  
  const suspendLength = Math.max(circleLength - activeLength - inactiveLength, 0);

  return (
    <div className="bg-white rounded-md p-4 border border-gray-200">
      <div className="flex justify-between mb-4">
        <div className="font-medium">Attendance Report</div>
      </div>
      <div className="relative flex justify-center donut-container">
        <div className="donut-chart">
          <svg viewBox="0 0 100 100" width="100%" height="100%">
          
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth={strokeWidth}
            />
            {activeLength > 0 && (
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#2C5282"
                strokeWidth={strokeWidth}
                strokeDasharray={`${activeLength} ${circleLength - activeLength}`}
                strokeDashoffset={0}
                strokeLinecap="butt"
                transform="rotate(-90 50 50)"
              />
            )}
            {inactiveLength > 0 && (
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#B8B8B8"
                strokeWidth={strokeWidth}
                strokeDasharray={`${inactiveLength} ${circleLength - inactiveLength}`}
                strokeDashoffset={-activeLength}
                strokeLinecap="butt"
                transform="rotate(-90 50 50)"
              />
            )}
            {suspendLength > 0 && (
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#458cbbff"
                strokeWidth={strokeWidth}
                strokeDasharray={`${suspendLength} ${circleLength - suspendLength}`}
                strokeDashoffset={-(activeLength + inactiveLength)}
                strokeLinecap="butt"
                transform="rotate(-90 50 50)"
              />
            )}
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
          <div className="donut-indicator donut-indicator-inactive"></div>
          <div>Inactive ({inactivePercentage}%)</div>
        </div>
        <div className="flex items-center">
          <div className="donut-indicator donut-indicator-suspend"></div>
          <div>Suspend ({suspendPercentage}%)</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDonutChart;