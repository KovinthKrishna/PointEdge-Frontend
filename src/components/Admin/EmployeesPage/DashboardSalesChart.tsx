import React from 'react';

interface ChartData {
  month: string;
  primary: number;   // Productivity percentage (0-100%)
  secondary: number; // Total valid OT hours (max 4h per employee)
}

interface DashboardProductivityChartProps {
  chartData: ChartData[];
}

const DashboardProductivityChart: React.FC<DashboardProductivityChartProps> = ({ chartData }) => {
  // Separate normalization for different data types
  const maxProductivity = Math.max(...chartData.map(item => item.primary)); // Max productivity percentage
  const maxOTHours = Math.max(...chartData.map(item => item.secondary)); // Max OT hours
  
  // Calculate height for productivity percentage (primary bar)
  const getProductivityBarHeight = (value: number): string => {
    // Normalize against 100% productivity for consistent scaling
    const normalizedMax = Math.max(maxProductivity, 100);
    return `${(value / normalizedMax) * 150}px`;
  };

  // Calculate height for OT hours (secondary bar) 
  const getOTBarHeight = (value: number): string => {
    // Normalize OT hours against maximum OT hours found in data
    if (maxOTHours === 0) return '0px';
    return `${(value / maxOTHours) * 150}px`;
  };

  return (
    <div className="productivity-chart-container">
      <div className="chart-header">
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color productivity-color"></span>
            <span>Productivity %</span>
          </div>
          <div className="legend-item">
            <span className="legend-color ot-color"></span>
            <span>OT Hours</span>
          </div>
        </div>
      </div>

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
                {/* Primary bar - Productivity Percentage */}
                <div 
                  className="chart-bar-primary productivity-bar"
                  style={{ height: getProductivityBarHeight(data.primary) }}
                  title={`Productivity: ${data.primary}%`}
                >
                </div>
                
                {/* Secondary bar - OT Hours (Dark Blue) */}
                <div 
                  className="chart-bar-secondary ot-hours-bar"
                  style={{ height: getOTBarHeight(data.secondary) }}
                  title={`OT Hours: ${data.secondary}h`}
                >
                </div>
              </div>
              <div className="chart-month-label">{data.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardProductivityChart;