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
  onLeaveEmployees: number;
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
  
  activeCount: number;
  leaveCount: number;
  activePercentage: number;
  leavePercentage: number;
  
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