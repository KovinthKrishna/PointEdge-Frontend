import React from 'react';

// StatCard Component Interface
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  chartData: number[];
  customMessage?: string;
  change?: number; // Now optional
}

const DashboardStatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  chartData,
  customMessage,
  change
}) => {
  return (
    <div className="stat-card" style={{ position: 'relative' }}>
      <div className="flex justify-between mb-4">
        <div className="stat-icon">
          {icon}
        </div>
      </div>
      <div className="relative mt-2">
        {/* Mini chart - bottom right corner */}
        <div className="mini-chart-container">
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
              customMessage === "at present" || (change !== undefined && change >= 0)
                ? 'text-green'
                : (change !== undefined && change < 0)
                  ? 'text-red'
                  : ''
            }`}
          >
            {customMessage ? (
              customMessage
            ) : (
              <>
                {/* Only show arrow if change is provided */}
                {change !== undefined && (
                  <span className={change >= 0 ? 'stat-arrow-up' : 'stat-arrow-down'}></span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;