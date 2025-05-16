export interface AttendanceDTO {
  employeeId: number;
  employeeName: string;
  role: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  otHours: string;
  status: string;
  avatar: string;
  date: string;
}

export interface EmployeeAttendance {
  id: number;
  attendanceId: number;
  name: string;
  role: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  otHours: string;
  status: string;
  avatar: string;
}