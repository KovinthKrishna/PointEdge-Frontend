import "./styles/ShiftReport2.css";

// Define types for props
interface Employee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  location: string;
  isFirstRow: boolean;
}

interface ShiftReport2PageProps {
  employee: Employee;
  onBackClick: () => void;
}

export default function ShiftReport2Page({ employee, onBackClick }: ShiftReport2PageProps) {
  // Sample shift data based on employee ID
  const getShiftData = (employeeId: string) => {
    const shiftData: Record<string, any[]> = {
      "2377373": [
        {
          shiftType: "Morning Shift",
          startTime: "08:30:00",
          endTime: "12:30:00",
          break: "00:30:00",
          otHours: "02:00:00",
          location: "Store 1",
          totalHours: "05:30:00",
          orders: "125 orders",
        },
        {
          shiftType: "Evening Shift",
          startTime: "15:00:00",
          endTime: "18:00:00",
          break: "00:10:00",
          otHours: "02:00:00",
          location: "Store 2",
          totalHours: "06:00:00",
          orders: "98 orders",
        },
      ],
      "2236767": [
        {
          shiftType: "Morning Shift",
          startTime: "07:00:00",
          endTime: "11:30:00",
          break: "00:20:00",
          otHours: "01:00:00",
          location: "Store 1",
          totalHours: "04:30:00",
          orders: "110 orders",
        },
      ],
      "2345657": [
        {
          shiftType: "Evening Shift",
          startTime: "14:00:00",
          endTime: "20:00:00",
          break: "00:45:00",
          otHours: "01:30:00",
          location: "Store 2",
          totalHours: "06:45:00",
          orders: "145 orders",
        },
      ],
      "2435412": [
        {
          shiftType: "Night Shift",
          startTime: "20:00:00",
          endTime: "02:00:00",
          break: "00:30:00",
          otHours: "00:00:00",
          location: "Store 3",
          totalHours: "06:30:00",
          orders: "78 orders",
        },
      ],
    };

    return shiftData[employeeId] || [];
  };

  const shifts = getShiftData(employee?.id);

  // Inline styles to ensure back button visibility
  const navBarStyle = {
    display: "flex",
    padding: "16px",
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    justifyContent:  "flex-end",
    alignItems: "center",
    width: "100%"
  };

  const backButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: "#ffffff",
    border: "1px solid #003049",
    borderRadius: "4px",
    color: "#003049",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s"
  };

  return (
    <div className="shift-report-container">
      {/* Top Navigation with inline styles */}
      <div style={navBarStyle}>
        <div>
          <button 
            onClick={onBackClick} 
            style={backButtonStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="report-header">
        <h1>Shift Report</h1>
      </div>

      {/* Employee Info */}
      <div className="container">
        <div className="employee-info">
          <div className="employee-avatar">
            <img
              src={employee?.avatar || "https://bit.ly/kent-c-dodds"}
              alt="Employee profile"
            />
          </div>

          <div className="employee-details">
            <div className="detail-grid">
              <div className="detail-label">Name</div>
              <div className="detail-value">: {employee?.name || "Eleanor Pena"}</div>
              <div className="detail-label">ID</div>
              <div className="detail-value">: {employee?.id || "2377373"}</div>
              <div className="detail-label">Role</div>
              <div className="detail-value">: {employee?.role || "Cashier"}</div>
            </div>
          </div>
        </div>

        {/* Shift Details Blocks */}
        <div className="shifts-container">
          {shifts.length > 0 ? (
            shifts.map((shift, index) => (
              <div key={index} className="shift-card">
                <div className="shift-header">
                  <div>{shift.shiftType}</div>
                </div>

                <div className="shift-details-grid">
                  {/* Left Column */}
                  <div className="shift-column">
                    <div className="shift-detail-grid">
                      <div className="shift-detail-item">
                        <div className="detail-number">1</div>
                        <div className="detail-content">
                          <div className="detail-label">Start Time:</div>
                          <div className="detail-value">{shift.startTime}</div>
                        </div>
                      </div>

                      <div className="shift-detail-item">
                        <div className="detail-number">2</div>
                        <div className="detail-content">
                          <div className="detail-label">End Time:</div>
                          <div className="detail-value">{shift.endTime}</div>
                        </div>
                      </div>

                      <div className="shift-detail-item">
                        <div className="detail-number">3</div>
                        <div className="detail-content">
                          <div className="detail-label">Break:</div>
                          <div className="detail-value">{shift.break}</div>
                        </div>
                      </div>

                      <div className="shift-detail-item">
                        <div className="detail-number">4</div>
                        <div className="detail-content">
                          <div className="detail-label">Location:</div>
                          <div className="detail-value">{shift.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column */}
                  <div className="shift-column">
                    <div className="shift-detail-grid">
                      <div className="shift-detail-item">
                        <div className="detail-number">5</div>
                        <div className="detail-content">
                          <div className="detail-label">OT Hours:</div>
                          <div className="detail-value">{shift.otHours}</div>
                        </div>
                      </div>

                      <div className="shift-detail-item">
                        <div className="detail-number">6</div>
                        <div className="detail-content">
                          <div className="detail-label">Total Hours:</div>
                          <div className="detail-value">{shift.totalHours}</div>
                        </div>
                      </div>

                      <div className="shift-detail-item">
                        <div className="detail-number">7</div>
                        <div className="detail-content">
                          <div className="detail-label">Orders:</div>
                          <div className="detail-value">{shift.orders}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Notes */}
                  <div className="shift-column">
                    <div className="notes-container">
                      <div className="notes-header">Notes</div>
                      <div className="notes-content">
                        {shift.shiftType} at {shift.location} with {shift.orders} processed. Total working time:{" "}
                        {shift.totalHours} including {shift.otHours} overtime.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-shifts">
              <div>No shift data available</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}