import "./styles/ShiftReport2.css";
import { Employee } from "../../../models/Employees";
import { useShiftDetailData } from "../../../hooks/useShiftDetaildata";
import ShiftReportBackButton from "./Reportbackbutton";
import ShiftReportEmployeeInfo from "./ReportEmployeeInfo";
import ShiftReportDetailCard from "./Reportdetailcard";

interface ShiftReport2PageProps {
  employee: Employee;
  onBackClick: () => void;
}

export default function ShiftReport2Page({ employee, onBackClick }: ShiftReport2PageProps) {
  const { shifts, loading, error } = useShiftDetailData(employee);

  return (
    <div className="shift-report-container">
      {/* Top Navigation */}
      <ShiftReportBackButton onBackClick={onBackClick} />

      {/* Header */}
      <div className="report-header">
        <h1>Shift Report</h1>
      </div>

      {/* Employee Info and Shift Details */}
      <div className="container">
        <ShiftReportEmployeeInfo employee={employee} />

        {/* Loading and Error States */}
        {loading && <div className="loading-message">Loading shift data...</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Shift Details Blocks */}
        <div className="shifts-container">
          {!loading && !error && shifts.length > 0 ? (
            shifts.map((shift, index) => (
              <ShiftReportDetailCard key={index} shift={shift} />
            ))
          ) : (
            !loading && !error && (
              <div className="no-shifts">
                <div>No shift data available for this employee</div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}