import React from "react";
import employeeIcon from "../../../assets/employee-icon.png";
import clockIcon from "../../../assets/clock-icon.png";
import "./styles/EmployeeDashboard.css";


const SalesChart: React.FC = () => {
 
  const salesData = [
    { month: 'Jan', primary: 65, secondary: 45 },
    { month: 'Feb', primary: 85, secondary: 60 },
    { month: 'Mar', primary: 50, secondary: 40 },
    { month: 'Apr', primary: 70, secondary: 55 },
    { month: 'May', primary: 80, secondary: 60 },
    { month: 'Jun', primary: 75, secondary: 65 },
    { month: 'Jul', primary: 70, secondary: 60 },
    { month: 'Aug', primary: 60, secondary: 50 },
    { month: 'Sep', primary: 55, secondary: 45 },
    { month: 'Oct', primary: 65, secondary: 55 },
    { month: 'Nov', primary: 75, secondary: 60 },
    { month: 'Dec', primary: 85, secondary: 55 },
  ];

  // Find the maximum value to normalize the bar heights
  const maxValue = Math.max(...salesData.flatMap(item => [item.primary, item.secondary]));
  
  // Calculate the height of each bar relative to the maximum value
  const getBarHeight = (value: number): string => {
    return `${(value / maxValue) * 150}px`;
  };

   return (
    <div className="chart-container">
       {/* Chart grid lines - fixed positioning   */}
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
        {salesData.map((data, index) => (
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

const EmployeeDashboardPage: React.FC = () => {
  return (
    <div className="dashboard-container">
     
      <div className="grid grid-cols-3 gap-6 mb-6">
        <StatCard
          icon={
            <img
              src="https://th.bing.com/th/id/R.12d1ca1ed26243d7628fdd4e1d4ef181?rik=VoTkKyaHH27vmg&riu=http%3a%2f%2fmedia-s3-us-east-1.ceros.com%2fgartner%2fimages%2f2016%2f09%2f20%2fab06779a075d7e1e3ed3e114355a3fee%2ficon2-individual-02.png&ehk=7r%2fpOA%2fTuq1JD8GyXcU7Uw8FZxdylRicmz0dHcBO1nM%3d&risl=&pid=ImgRaw&r=0"
              alt="Employee Icon"
              width="36"
              height="36"
            />
          }
          title="No. of Employees"
          value="1,256"
          change={10}
          chartData={[18, 25, 22, 20]}
        />
        <StatCard
          icon={
            <img
              src="https://icon-library.com/images/costly-icon/costly-icon-26.jpg"
              alt="Dollar Icon"
              width="36"
              height="36"
            />
          }
          title="Total Sales"
          value="$8,245.00"
          change={-0.5}
          chartData={[20, 15, 25, 18]}
        />
        <StatCard
          icon={
            <img
              src="https://static.vecteezy.com/system/resources/previews/014/322/497/original/shopping-cart-icons-design-in-blue-circle-png.png"
              alt="Order Icon"
              width="36"
              height="36"
            />
          }
          title="Total Order"
          value="1,256"
          change={10}
          chartData={[15, 18, 25, 20]}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3-1 gap-6">
        {/* Main Chart */}
        <div className="bg-white rounded-md p-4 border border-blue-100">
          <div className="flex justify-between mb-4">
            <div className="font-medium">Employee Productivity</div>
            <select className="select" defaultValue="2024">
              <option value="2023">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          
          <SalesChart />
          
          {/* Customer Stats */}
          <div className="flex justify-between mt-16">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-md mr-3">
                <img
                  src={clockIcon}
                  alt="Clock Icon"
                  width="30"
                  height="30"
                />
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  Total Hours Worked
                </div>
                <div className="font-bold">10,52 h</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="badge badge-green mr-2">
                ↑ 3%
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-md mr-3">
                <img
                  src={employeeIcon}
                  alt="Product Icon"
                  width="30"
                  height="30"
                />
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  Total Employees
                </div>
                <div className="font-bold text-sm">
                  250
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="badge badge-green mr-2">
                ↑ 3%
              </div>
            </div>
          </div>
        </div>

        

        <div>
          <div className="flex flex-col gap-6">
            
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <div className="flex justify-between mb-4">
                <div className="font-medium">Attendance Report</div>
              </div>
              <div className="relative flex justify-center donut-container">
                
                {/*  donut chart */}
                <div className="donut-chart">
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#2C5282"
                      strokeWidth="20"
                      strokeDasharray="188.5 251.3"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#B8B8B8"
                      strokeWidth="20"
                      strokeDasharray="70.7 251.3"
                      strokeDashoffset="-188.5"
                      transform="rotate(-90 50 50)"
                    />
                    <circle cx="50" cy="50" r="20" fill="white" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-center mt-4 text-xs">
                <div className="flex items-center mr-4">
                  <div className="donut-indicator donut-indicator-active"></div>
                  <div>Active</div>
                </div>
                <div className="flex items-center mr-4">
                  <div className="donut-indicator donut-indicator-leave"></div>
                  <div>Leave</div>
                </div>
              </div>
            </div>

            {/* Weekly Transaction */}
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <div className="flex justify-between mb-4">
                <div className="font-medium">Weekly Transaction Summary</div>
                <div className="text-xs text-blue-500">
                  Last 7 month
                </div>
              </div>
              <div className="weekly-chart-container">
                <div className="relative mt-3">
                  {/* Mini chart */}
                  <div className="flex justify-between items-end weekly-bars-container">
                    {[140, 100, 125, 85, 150, 110, 160].map((height, i) => (
                      <div 
                        key={i} 
                        className="weekly-bar"
                        style={{ height: `${height}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-500">
                <div>24 Jun</div>
                <div>25 Jun</div>
                <div>26 Jun</div>
                <div>27 Jun</div>
                <div>28 Jun</div>
                <div>29 Jun</div>
                <div>30 Jun</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: number;
  chartData: number[];
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change }) => {
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
            {[35, 25, 40, 30].map((height, i) => (
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
          <div className={`stat-help ${change >= 0 ? 'text-green' : 'text-red'}`}>
            <span className={change >= 0 ? 'stat-arrow-up' : 'stat-arrow-down'}></span>
            {Math.abs(change)}% from last week
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;