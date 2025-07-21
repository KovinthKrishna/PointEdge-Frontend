export interface Employee {
  id: number | string;
  name: string;
  avatar: string;
  role: string;
  status?: string;
  location: string;
  isFirstRow?: boolean;
}

export interface EmployeeDashboardData {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  suspendEmployees: number;
  totalHoursWorked: string;
  employeeChangePercent: number;
  hoursChangePercent: number;

  totalOrders: number;
  totalSales: number;

  productivityData: {
    month: string;
    primary: number;
    secondary: number;
  }[];

  // Donut Chart Data
  activeCount: number;
  inactiveCount: number;
  suspendCount: number;
  activePercentage: number;
  inactivePercentage: number;
  suspendPercentage: number;

  weeklyAttendance: {
    date: string;
    dayOfWeek: string;
    attendancePercentage: number;
    height: number;
  }[];
}

export interface OrderStats {
  totalOrders: number;
  orderChangePercent: number;
}