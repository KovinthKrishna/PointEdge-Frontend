import React from 'react';

interface ChartData {
  month: string;
  primary: number;
  secondary: number;
}

interface DashboardSalesChartProps {
  chartData: ChartData[];
}

const DashboardSalesChart: React.FC<DashboardSalesChartProps> = ({ chartData }) => {
  // Find the maximum value to normalize the bar heights
  const maxValue = Math.max(...chartData.flatMap(item => [item.primary, item.secondary]));
  
  // Calculate the height of each bar relative to the maximum value
  const getBarHeight = (value: number): string => {
    return `${(value / maxValue) * 150}px`;
  };

  return (
    <div className="chart-container">
      {/* Chart grid lines - fixed positioning */}
      <div className="chart-grid-lines">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="chart-grid-line"
            style={{ top: `${i * 20}%` }}
          />
        ))}
      </div>

      {/* Chart bars - improved layout */}
      <div className="chart-bars-container">
        {chartData.map((data, index) => (
          <div key={index} className="chart-month-column">
            <div className="chart-bars-wrapper">
              <div 
                className="chart-bar-primary"
                style={{ height: getBarHeight(data.primary) }}
              />
              <div 
                className="chart-bar-secondary"
                style={{ height: getBarHeight(data.secondary) }}
              />
            </div>
            <div className="chart-month-label">{data.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSalesChart;