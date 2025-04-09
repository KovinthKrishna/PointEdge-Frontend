import React, { useState } from 'react';
import { FaArrowLeft, FaStar, FaCrown, FaAward, FaMedal } from 'react-icons/fa';

interface DiscountLoyaltySettingsProps {
  onBack: () => void;
}

const DiscountLoyaltySettings: React.FC<DiscountLoyaltySettingsProps> = ({ onBack }) => {
  const [points, setPoints] = useState({
    gold: 10000,
    silver: 10000,
    bronze: 5000,
    rupees: 5000
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPoints(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSave = () => {
    console.log('Saving points settings:', points);
    onBack();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0 }}>Loyalty Points Settings</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
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
            Back to Loyalty
          </button>
          <button 
            onClick={handleSave}
            style={{
              padding: '6px 12px',
              background: '#008ED8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Save Settings
          </button>
        </div>
      </div>
      
      <div style={{ 
        background: '#fff', 
        border: '1px solid #eee', 
        borderRadius: '4px', 
        padding: '20px' 
      }}>
        {/* Gold Membership */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <FaCrown style={{ color: '#FFD700', fontSize: '16px', marginRight: '8px' }} />
            <label style={{ fontSize: '14px', fontWeight: '500' }}>
              Loyalty Points Required for Gold Membership
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px'
            }}>
              <FaStar style={{ color: 'white', fontSize: '10px' }} />
            </div>
            <input
              type="number"
              name="gold"
              value={points.gold}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Silver Membership */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <FaAward style={{ color: '#C0C0C0', fontSize: '16px', marginRight: '8px' }} />
            <label style={{ fontSize: '14px', fontWeight: '500' }}>
              Loyalty Points Required for Silver Membership
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px'
            }}>
              <FaStar style={{ color: 'white', fontSize: '10px' }} />
            </div>
            <input
              type="number"
              name="silver"
              value={points.silver}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Bronze Membership */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <FaMedal style={{ color: '#CD7F32', fontSize: '16px', marginRight: '8px' }} />
            <label style={{ fontSize: '14px', fontWeight: '500' }}>
              Loyalty Points Required for Bronze Membership
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px'
            }}>
              <FaStar style={{ color: 'white', fontSize: '10px' }} />
            </div>
            <input
              type="number"
              name="bronze"
              value={points.bronze}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Rupees Conversion */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <FaStar style={{ color: '#008ED8', fontSize: '16px', marginRight: '8px' }} />
            <label style={{ fontSize: '14px', fontWeight: '500' }}>
              Points Required for 100 Rupees
            </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px'
            }}>
              <FaStar style={{ color: 'white', fontSize: '10px' }} />
            </div>
            <input
              type="number"
              name="rupees"
              value={points.rupees}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountLoyaltySettings;