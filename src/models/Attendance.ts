export interface AttendanceDTO {
  employeeId: number;
  employeeName: string;
  role: string;
  clockIn: string | null;
  clockOut: string | null;
  totalHours: string | null;
  otHours: string | null;
  status: string;
  avatar: string;
  date: string;
}

export interface EmployeeAttendance {
  id: number;
  name: string;
  role: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  otHours: string;
  status: string;
  avatar: string;
  date: string;
}

export interface AttendanceSearchParams {
  date: string;
  searchQuery: string;
  employeeId: number | null;
}