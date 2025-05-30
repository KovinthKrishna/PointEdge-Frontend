import React, { useState, useEffect } from "react";
import axios from "axios";
import employeeIcon from "../../../assets/employee-icon.png";
import clockIcon from "../../../assets/clock-icon.png";
import "./styles/EmployeeDashboard.css";

// Define interface for backend data
interface EmployeeDashboardData {
  // Overview Stats
  totalEmployees: number;
  activeEmployees: number;
  onLeaveEmployees: number;
  totalHoursWorked: string;
  employeeChangePercent: number;
  hoursChangePercent: number;
  
  // Productivity Chart Data
  productivityData: {
    month: string;
    primary: number;
    secondary: number;
  }[];
  
  // Attendance Report Data
  activeCount: number;
  leaveCount: number;
  activePercentage: number;
  leavePercentage: number;
  
  // Weekly Attendance Data
  weeklyAttendance: {
    date: string;
    dayOfWeek: string;
    attendancePercentage: number;
    height: number;
  }[];
}

// Orders data will come from a separate endpoint
interface OrderStats {
  totalOrders: number;
  orderChangePercent: number;
}

const SalesChart: React.FC<{ chartData: { month: string; primary: number; secondary: number }[] }> = ({ chartData }) => {
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

const EmployeeDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<EmployeeDashboardData | null>(null);
  const [orderStats, setOrderStats] = useState<OrderStats>({ totalOrders: 0, orderChangePercent: 0 });
  
  // Get current year
  const currentYear = new Date().getFullYear();

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<EmployeeDashboardData>(
          `http://localhost:8080/api/dashboard/employee-stats?year=${currentYear}`
        );
        setDashboardData(response.data);
        
        // Also fetch order stats (assuming you have this endpoint)
        try {
          const orderResponse = await axios.get<OrderStats>("http://localhost:8080/api/dashboard/order-stats");
          setOrderStats(orderResponse.data);
        } catch (orderErr) {
          console.error("Error fetching order stats:", orderErr);
          // Use default values for orders if endpoint not available
          setOrderStats({
            totalOrders: 1256,
            orderChangePercent: 10
          });
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // No dependencies needed as we only fetch once on mount

  // Show loading state
  if (loading && !dashboardData) {
    return <div className="loading-container">Loading dashboard data...</div>;
  }

  // Show error state
  if (error && !dashboardData) {
    return <div className="error-container">{error}</div>;
  }

  // Use default data if API call fails
  const data = dashboardData || {
    totalEmployees: 0,
    activeEmployees: 0,
    onLeaveEmployees: 0,
    totalHoursWorked: "0h",
    employeeChangePercent: 0,
    hoursChangePercent: 0,
    productivityData: Array(12).fill(0).map((_, i) => ({
      month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      primary: 0,
      secondary: 0
    })),
    activeCount: 0,
    leaveCount: 0,
    activePercentage: 0,
    leavePercentage: 0,
    weeklyAttendance: Array(7).fill(0).map(() => ({
      date: "",
      dayOfWeek: "",
      attendancePercentage: 0,
      height: 0
    }))
  };

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
          value={data.totalEmployees.toString()}
          change={data.employeeChangePercent}
          chartData={[18, 25, 22, 20]}
          customMessage="at present"
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
          value="$0"
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
          value={orderStats.totalOrders.toString()}
          change={orderStats.orderChangePercent}
          chartData={[15, 18, 25, 20]}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3-1 gap-6">
        {/* Main Chart */}
        <div className="bg-white rounded-md p-4 border border-blue-100">
          <div className="flex justify-between mb-4">
            <div className="font-medium">Employee Productivity</div>
            <div className="font-medium">
              {currentYear}
            </div>
          </div>
          
          <SalesChart chartData={data.productivityData} />
          
          {/* Employee Stats */}
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
                <div className="font-bold">{data.totalHoursWorked}</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className={`badge ${data.hoursChangePercent >= 0 ? 'badge-green' : 'badge-red'} mr-2`}>
                {data.hoursChangePercent >= 0 ? '↑' : '↓'} {Math.abs(data.hoursChangePercent)}%
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-md mr-3">
                <img
                  src={employeeIcon}
                  alt="Employee Icon"
                  width="30"
                  height="30"
                />
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  Total Employees
                </div>
                <div className="font-bold text-sm">
                  {data.totalEmployees}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className={`badge ${data.employeeChangePercent >= 0 ? 'badge-green' : 'badge-red'} mr-2`}>
                {data.employeeChangePercent >= 0 ? '↑' : '↓'} {Math.abs(data.employeeChangePercent)}%
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
                      strokeDasharray={`${data.activePercentage * 2.51} 251.3`}
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#B8B8B8"
                      strokeWidth="20"
                      strokeDasharray={`${data.leavePercentage * 2.51} 251.3`}
                      strokeDashoffset={`-${data.activePercentage * 2.51}`}
                      transform="rotate(-90 50 50)"
                    />
                    <circle cx="50" cy="50" r="20" fill="white" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-center mt-4 text-xs">
                <div className="flex items-center mr-4">
                  <div className="donut-indicator donut-indicator-active"></div>
                  <div>Active ({data.activePercentage}%)</div>
                </div>
                <div className="flex items-center mr-4">
                  <div className="donut-indicator donut-indicator-leave"></div>
                  <div>Leave ({data.leavePercentage}%)</div>
                </div>
              </div>
            </div>

            {/* Weekly Attendance Summary with Percentages */}
            <div className="bg-white rounded-md p-4 border border-gray-200">
              <div className="flex justify-between mb-4">
                <div className="font-medium">Weekly Attendance Summary</div>
                <div className="text-xs text-blue-500">
                  Last 7 days
                </div>
              </div>
              <div className="weekly-chart-container">
                <div className="relative mt-3">
                  {/* Mini chart with percentage labels */}
                  <div className="flex justify-between items-end weekly-bars-container">
                    {data.weeklyAttendance.map((day, i) => (
                      <div key={i} className="weekly-bar-container">
                        <div className="weekly-bar-percent">{day.attendancePercentage}%</div>
                        <div 
                          className="weekly-bar"
                          style={{ height: `${day.height}px` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-500">
                {data.weeklyAttendance.map((day, i) => (
                  <div key={i}>{day.dayOfWeek}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// StatCard Component with Interface
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: number;
  chartData: number[];
  customMessage?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, customMessage }) => {
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

export default EmployeeDashboardPage;