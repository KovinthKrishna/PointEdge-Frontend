import React from 'react';

// StatCard Component Interface
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: number;
  chartData: number[];
  customMessage?: string;
}

const DashboardStatCard: React.FC<StatCardProps> = ({ 
  icon, 
  title, 
  value, 
  change, 
  chartData, 
  customMessage 
}) => {
  return (
    <div className="stat-card">
      <div className="flex justify-between mb-4">
        <div className="stat-icon">
          {icon}
        </div>
      </div>
      <div className="relative mt-2">
        {/* Mini chart - positioned absolutely to the right */}
        <div className="absolute right-0 bottom-0">
          <div className="flex items-end gap-1 mini-chart-container">
            {chartData.map((height, i) => (
              <div 
                key={i} 
                className={`mini-chart-bar ${i === 2 ? "mini-chart-bar-highlight" : "mini-chart-bar-normal"}`}
                style={{ height: `${height}px` }}
              />
            ))}
          </div>
        </div>

        <div className="stat-title">
          {title}
        </div>
        <div className="mt-1">
          <div className="stat-number">{value}</div>
          <div 
            className={`stat-help ${
              customMessage === "at present" || (!customMessage && change >= 0) 
                ? 'text-green' 
                : (!customMessage && change < 0) 
                  ? 'text-red' 
                  : ''
            }`}
          >
            {customMessage ? (
              customMessage
            ) : (
              <>
                <span className={change >= 0 ? 'stat-arrow-up' : 'stat-arrow-down'}></span>
                {Math.abs(change)}% from last week
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;