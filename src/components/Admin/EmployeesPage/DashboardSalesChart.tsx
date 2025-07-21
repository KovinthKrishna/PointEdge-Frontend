import React from 'react';

interface ChartData {
  month: string;
  primary: number;   
  secondary: number; // Total valid OT hours (max 4h per employee)
}

interface DashboardProductivityChartProps {
  chartData: ChartData[];
}

const DashboardProductivityChart: React.FC<DashboardProductivityChartProps> = ({ chartData }) => {

  const maxProductivity = Math.max(...chartData.map(item => item.primary)); 
  const maxOTHours = Math.max(...chartData.map(item => item.secondary)); 
  
  // Calculate height for productivity percentage 
  const getProductivityBarHeight = (value: number): string => {
    const normalizedMax = Math.max(maxProductivity, 100);
    return `${(value / normalizedMax) * 150}px`;
  };

  // Calculate height for OT hours 
  const getOTBarHeight = (value: number): string => {
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
        
        <div className="chart-grid-lines">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="chart-grid-line"
              style={{ top: `${i * 20}%` }}
            />
          ))}
        </div>

       
        <div className="chart-bars-container">
          {chartData.map((data, index) => (
            <div key={index} className="chart-month-column">
              <div className="chart-bars-wrapper">
               
                <div 
                  className="chart-bar-primary productivity-bar"
                  style={{ height: getProductivityBarHeight(data.primary) }}
                  title={`Productivity: ${data.primary}%`}
                >
                </div>
                
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