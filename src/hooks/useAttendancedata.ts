import { useState, useEffect } from 'react';
import { getAttendances, searchAttendances } from '../services/employeeService';
import { AttendanceDTO, EmployeeAttendance, AttendanceSearchParams } from '../models/Attendance';

export const useAttendanceData = () => {
  const [employeeAttendances, setEmployeeAttendances] = useState<EmployeeAttendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState<string>('08:00:00');
  const [endTime, setEndTime] = useState<string>('17:00:00');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);
  
  const formatDateForBackend = (dateString: string): string => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };
  
  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const attendanceData = await getAttendances();
      
      const formattedData: EmployeeAttendance[] = attendanceData.map((att: AttendanceDTO) => ({
        id: att.employeeId,
        name: att.employeeName,
        role: att.role,
        clockIn: att.clockIn || '-',
        clockOut: att.clockOut || '-',
        totalHours: att.totalHours || '0:00:00',
        otHours: att.otHours || '0:00:00',
        status: att.status,
        avatar: att.avatar,
        date: att.date
      }));
      
      setEmployeeAttendances(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Could not load attendance data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async (): Promise<void> => {
    setLoading(true);
    try {
      const isNumeric = /^\d+$/.test(searchQuery);
      
      const searchData: AttendanceSearchParams = {
        date: formatDateForBackend(date),
        searchQuery: isNumeric ? '' : searchQuery,
        employeeId: isNumeric ? parseInt(searchQuery) : null
      };
      
      console.log("Sending search request:", searchData);
      
      const searchResults = await searchAttendances(searchData);
      
      const formattedData: EmployeeAttendance[] = searchResults.map((att: AttendanceDTO) => ({
        id: att.employeeId,
        name: att.employeeName,
        role: att.role,
        clockIn: att.clockIn || '-',
        clockOut: att.clockOut || '-',
        totalHours: att.totalHours || '0:00:00',
        otHours: att.otHours || '0:00:00',
        status: att.status,
        avatar: att.avatar,
        date: att.date
      }));
      
      setEmployeeAttendances(formattedData);
    } catch (error) {
      console.error('Error searching:', error);
      
      setErrorMessage('Could not search attendance records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return {
    employeeAttendances,
    loading,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    searchQuery,
    setSearchQuery,
    errorMessage,
    setErrorMessage,
    handleSearch,
    getInitials
  };
};