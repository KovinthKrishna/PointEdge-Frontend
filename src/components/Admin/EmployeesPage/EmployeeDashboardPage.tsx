import React, { useState, useEffect } from "react";
import axios from "axios";
import employeeIcon from "../../../assets/employee-icon.png";
import clockIcon from "../../../assets/clock-icon.png";
import "./styles/EmployeeDashboard.css";
import { EmployeeDashboardData } from "../../../models/Employees";
import DashboardStatCard from "./DashboardStatCard";
import DashboardSalesChart from "./DashboardSalesChart";
import DashboardDonutChart from "./DashboardDonutchart";
import DashboardWeeklyAttendance from "./DashboardweeklyAttendance";

const EmployeeDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<EmployeeDashboardData | null>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<EmployeeDashboardData>(
          `http://localhost:8080/api/dashboard/employee-stats?year=${currentYear}`
        );
        setDashboardData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentYear]);

  if (loading && !dashboardData) {
    return <div className="loading-container">Loading dashboard data...</div>;
  }

  if (error && !dashboardData) {
    return (
      <div className="error-message">
        Failed to load employee dashboard data. Please try again later.
      </div>
    );
  }

  const data = dashboardData || {
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    suspendEmployees: 0,
    totalHoursWorked: "0h",
    employeeChangePercent: 0,
    hoursChangePercent: 0,
    totalOrders: 0,
    totalSales: 0,
    productivityData: Array(12).fill(0).map((_, i) => ({
      month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      primary: 0,
      secondary: 0
    })),
    activeCount: 0,
    inactiveCount: 0,
    suspendCount: 0,
    activePercentage: 0,
    inactivePercentage: 0,
    suspendPercentage: 0,
    weeklyAttendance: Array(7).fill(0).map(() => ({
      date: "",
      dayOfWeek: "",
      attendancePercentage: 0,
      height: 0
    }))
  };

  // Ensure percentages are numbers (in case backend sends as string)
  const activePercentage = Number(data.activePercentage) || 0;
  const inactivePercentage = Number(data.inactivePercentage) || 0;
  const suspendPercentage = Number(data.suspendPercentage) || 0;

  const formattedSales = `Rs.${Number(data.totalSales).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="attendance-container">
      <div className="attendance-content">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <DashboardStatCard
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
          <DashboardStatCard
            icon={
              <img
                src="https://icon-library.com/images/costly-icon/costly-icon-26.jpg"
                alt="Dollar Icon"
                width="36"
                height="36"
              />
            }
            title="Total Sales"
            value={formattedSales}
            change={0}
            chartData={[20, 15, 25, 18]}
          />
          <DashboardStatCard
            icon={
              <img
                src="https://static.vecteezy.com/system/resources/previews/014/322/497/original/shopping-cart-icons-design-in-blue-circle-png.png"
                alt="Order Icon"
                width="36"
                height="36"
              />
            }
            title="Total Order"
            value={data.totalOrders.toString()}
            change={0}
            chartData={[15, 18, 25, 20]}
          />
        </div>

        <div className="grid grid-cols-3-1 gap-6">
          <div className="bg-white rounded-md p-4 border border-blue-100">
            <div className="flex justify-between mb-4">
              <div className="font-medium">Employee Productivity</div>
              <div className="font-medium">
                {currentYear}
              </div>
            </div>
            <DashboardSalesChart chartData={data.productivityData} />

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
              <DashboardDonutChart 
                activePercentage={activePercentage}
                inactivePercentage={inactivePercentage}
                suspendPercentage={suspendPercentage}
              />

              <DashboardWeeklyAttendance
                weeklyAttendance={data.weeklyAttendance}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;