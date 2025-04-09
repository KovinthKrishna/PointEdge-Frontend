import React from 'react';
import { FaTrash, FaFlag, FaPlus } from 'react-icons/fa';

interface DiscountOptionsItemProps {
  onReportClick: () => void;
  onAddClick: () => void;
}

const DiscountOptionsItem: React.FC<DiscountOptionsItemProps> = ({ 
  onReportClick,
  onAddClick 
}) => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      borderBottom: '1px solid #eee',
      maxWidth: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: '20px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}>
        <h1 style={{
          margin: '0',
          fontSize: 'clamp(20px, 4vw, 24px)',
          fontWeight: 'bold',
          lineHeight: '1.2'
        }}>
          Item Discounts <span style={{
            color: '#008ED8',
            fontSize: '0.8em',
            fontWeight: 'normal'
          }}>67</span>
        </h1>
        <h2 style={{
          margin: '0',
          fontSize: 'clamp(14px, 3vw, 16px)',
          fontWeight: 'normal',
          color: '#666',
          lineHeight: '1.2'
        }}>
          Bond Sales with Smart Discounts
        </h2>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <button className="hover-button" style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 12px',
          background: '#fff',
          border: '1px solid #FF0000',
          color: '#FF0000',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap'
        }}>
          <FaTrash style={{ marginRight: '8px', fontSize: '14px', color: '#FF0000' }} />
          Delete All
        </button>
        
        <button 
          onClick={onAddClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            background: '#008ED8',
            color: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
        >
          <FaPlus style={{ marginRight: '8px', fontSize: '14px' }} />
          Add new Discount
        </button>
      </div>
    </div>
  );
};

export default DiscountOptionsItem;