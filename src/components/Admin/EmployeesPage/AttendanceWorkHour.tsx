import React from 'react';

interface AttendanceWorkHourProps {
  date: string;
  setDate: (date: string) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
}

const AttendanceWorkHour: React.FC<AttendanceWorkHourProps> = ({
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime
}) => {
  return (
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
            readOnly
            style={{ 
              backgroundColor: '#f7fafc', 
              color: '#000000ff'
            }}
          />
        </div>
        <div className="col-start-4">
          <div className="text-sm mb-1">Start Time</div>
          <input 
            className="input input-sm input-bg-white"
            type="time"
            value={startTime}
            readOnly
            style={{ 
              backgroundColor: '#f7fafc', 
              color: '#000000ff'
            }}
          />
        </div>
        <div>
          <div className="text-sm mb-1">End Time</div>
          <input 
            className="input input-sm input-bg-white"
            type="time"
            value={endTime}
            readOnly
            style={{ 
              backgroundColor: '#f7fafc', 
              color: '#000000ff'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendanceWorkHour;