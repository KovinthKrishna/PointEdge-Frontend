import React from 'react';

interface ShiftReportBackButtonProps {
  onBackClick: () => void;
}

const Reportbackbutton: React.FC<ShiftReportBackButtonProps> = ({ onBackClick }) => {
  // Inline styles to ensure back button visibility
  const navBarStyle = {
    display: "flex",
    padding: "16px",
    backgroundColor: "white",
    borderBottom: "1px solid #e2e8f0",
    justifyContent: "flex-end",
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
  );
};

export default Reportbackbutton;