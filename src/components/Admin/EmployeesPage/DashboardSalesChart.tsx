import React from 'react';

interface ChartData {
  month: string;
  primary: number;   
  secondary: number; 
}

interface DashboardProductivityChartProps {
  chartData: ChartData[];
}

const DashboardProductivityChart: React.FC<DashboardProductivityChartProps> = ({ chartData }) => {


  const maxProductivity = 100;
  const maxOTPercent = 100;


  const getProductivityBarHeight = (value: number): string => {
    return `${(value / maxProductivity) * 150}px`;
  };

  
  const getOTBarHeight = (value: number): string => {
    return `${(value / maxOTPercent) * 150}px`;
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
            <span>OT %</span>
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
          
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span className="bar-value">{data.primary}%</span>
                  <div 
                    className="chart-bar-primary productivity-bar"
                    style={{ height: getProductivityBarHeight(data.primary) }}
                    title={`Productivity: ${data.primary}%`}
                  >
                  </div>
                </div>
               
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span className="bar-value">{data.secondary}%</span>
                  <div 
                    className="chart-bar-secondary ot-hours-bar"
                    style={{ height: getOTBarHeight(data.secondary) }}
                    title={`OT Percentage: ${data.secondary}%`}
                  >
                  </div>
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