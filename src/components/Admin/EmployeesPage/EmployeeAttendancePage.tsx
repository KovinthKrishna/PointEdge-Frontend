import { useState, useEffect } from 'react';
import { getAttendances, searchAttendances } from '../../../services/employeeService';
import './styles/EmployeeAttendance.css';
import {AttendanceDTO, EmployeeAttendance} from '../../../models/Attendance';



const EmployeeAttendancePage = () => {
  const [employeeAttendances, setEmployeeAttendances] = useState<EmployeeAttendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState('07:30:00');
  const [endTime, setEndTime] = useState('16:00:00');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<{ title: string; message: string; type: string } | null>(null);

  // Load data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  
  // Format date helper
  const formatDateForBackend = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };
  
  // Fetch attendance data
  const fetchData = async () => {
    setLoading(true);
    try {
      const attendanceData = await getAttendances();
      
      const formattedData = attendanceData.map((att: AttendanceDTO) => ({
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
      setToastMessage({
        title: 'Error fetching data',
        message: 'Could not load attendance data. Please try again later.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle search
  const handleSearch = async () => {
    setLoading(true);
    try {
      // Check if searchQuery is a number (employee ID)
      const isNumeric = /^\d+$/.test(searchQuery);
      
      const searchData = {
        date: formatDateForBackend(date),
        searchQuery: isNumeric ? '' : searchQuery,
        employeeId: isNumeric ? parseInt(searchQuery) : null
      };
      
      console.log("Sending search request:", searchData);
      
      const searchResults = await searchAttendances(searchData);
      
      const formattedData = searchResults.map((att: AttendanceDTO) => ({
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
      
      setToastMessage({
        title: 'Search failed',
        message: 'Could not search attendance records. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle enter key press for search
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="attendance-container">
      <div className="attendance-content">
        {/* Work Hour Section */}
        <div className="work-hour-section">
          <div className="grid grid-cols-5 gap-9">
            <div>
              <div className="font-medium">Work Hour</div>
            </div>
            <div>
              <div className="text-sm mb-1">Date</div>
              <input 
                className="input input-sm input-bg-white"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="col-start-4">
              <div className="text-sm mb-1">Start Time</div>
              <input 
                className="input input-sm input-bg-white"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <div className="text-sm mb-1">End Time</div>
              <input 
                className="input input-sm input-bg-white"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex mb-6 gap-4">
          <div className="input-group">
            <div className="input-left-element">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                  stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              className="input input-bg-white input-with-icon"
              placeholder="Search by name, id, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="flex gap-4">
             <button 
              className={`button button-primary ${loading ? 'loading-button' : ''}`}
              onClick={handleSearch}
              disabled={loading}
               >
              {loading && <div className="spinner spinner-small"></div>}
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="box bg-white rounded-md overflow-hidden shadow-sm">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Clock In</th>
                  <th>Clock Out</th>
                  <th>Total Hours</th>
                  <th>OT Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                  {employeeAttendances.length === 0 ? (
                  <tr>
                  <td colSpan={8} className="empty-table-message">
                     No employees found
                  </td>
                 </tr>
               ) : (   
                employeeAttendances.map((attendance) => (
                 <tr key={attendance.id}>
                    <td>{attendance.id}</td>
                    <td>
                      <div className="flex align-center">
                        <div className="avatar">
                          {attendance.avatar ? (
                            <img src={attendance.avatar} alt={attendance.name} />
                          ) : (
                            <span className="avatar-fallback">{getInitials(attendance.name)}</span>
                          )}
                        </div>
                        <span>{attendance.name}</span>
                      </div>
                    </td>
                    <td>{attendance.role}</td>
                    <td>{attendance.clockIn}</td>
                    <td>{attendance.clockOut}</td>
                    <td>{attendance.totalHours}</td>
                    <td>{attendance.otHours}</td>
                    <td>
                      <div 
                        className={`badge ${attendance.status === "Active" ? "badge-active" : "badge-inactive"}`}
                      >
                        {attendance.status}
                      </div>
                    </td>
                  </tr>                  
                ))
                 )}

              </tbody>
            </table>
          )}
        </div>

        {/* Toast notification */}
        {toastMessage && (
          <div className={`toast toast-${toastMessage.type}`}>
            <div className="font-medium">{toastMessage.title}</div>
            <div>{toastMessage.message}</div>
            <button 
              className="toast-close-button"
              onClick={() => setToastMessage(null)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeAttendancePage;