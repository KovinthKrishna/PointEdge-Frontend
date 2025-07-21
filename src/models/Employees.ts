export interface Employee {
  id: number | string;
  name: string;
  avatar: string;
  role: string;
  status?: string;
  location: string;
  isFirstRow?: boolean;
}

// Dashboard data structures
export interface EmployeeDashboardData {
  // Overview Stats
  totalEmployees: number;
  activeEmployees: number;
  onLeaveEmployees: number;
  totalHoursWorked: string;
  employeeChangePercent: number;
  hoursChangePercent: number;

  totalOrders: number;
  totalSales: number;
  
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

export interface OrderStats {
  totalOrders: number;
  orderChangePercent: number;
}