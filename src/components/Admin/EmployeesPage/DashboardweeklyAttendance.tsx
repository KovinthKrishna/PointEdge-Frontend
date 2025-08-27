import React from 'react';

interface WeeklyAttendanceDay {
  date: string;
  dayOfWeek: string;
  attendancePercentage: number;
  height: number;
}

interface DashboardWeeklyAttendanceProps {
  weeklyAttendance: WeeklyAttendanceDay[];
}

const DashboardWeeklyAttendance: React.FC<DashboardWeeklyAttendanceProps> = ({
  weeklyAttendance
}) => {
  return (
    <div className="bg-white rounded-md p-4 border border-gray-200">
      <div className="flex justify-between mb-4">
        <div className="font-medium">Weekly Attendance Summary</div>
        <div className="text-xs text-blue-500">
          Last 7 days
        </div>
      </div>
      <div className="weekly-chart-container">
        <div className="relative mt-3">
          <div className="flex justify-between items-end weekly-bars-container" style={{ height: '160px' }}>
            {weeklyAttendance.map((day, i) => (
              <div key={i} className="weekly-bar-container flex flex-col justify-end">
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
        {weeklyAttendance.map((day, i) => (
          <div key={i}>{day.dayOfWeek}</div>
        ))}
      </div>
    </div>
  );
};

export default DashboardWeeklyAttendance;