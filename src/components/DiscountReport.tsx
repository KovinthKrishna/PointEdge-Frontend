import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface DiscountReportProps {
  onBack: () => void;
}

const DiscountReport: React.FC<DiscountReportProps> = ({ onBack }) => {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0 }}>Discount Report | Analyzes </h1>
        <button 
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '6px 12px',
            background: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          <FaArrowLeft style={{ marginRight: '6px', fontSize: '12px' }} />
          Back to Discounts
        </button>
      </div>
      
      {/* Report content */}
      <div style={{ 
        background: '#fff', 
        border: '1px solid #eee', 
        borderRadius: '4px', 
        padding: '20px' 
      }}>
        <p>Discount report content goes here</p>
      </div>
    </div>
  );
};

export default DiscountReport;