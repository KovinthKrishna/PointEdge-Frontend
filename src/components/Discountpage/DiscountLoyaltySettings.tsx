import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaStar, FaCrown, FaAward, FaMedal, FaCheck } from 'react-icons/fa';
import { fetchLoyaltyThresholds, updateLoyaltyThresholds } from '../../services/discountService';

interface DiscountLoyaltySettingsProps {
  onBack: () => void;
}

interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

const DiscountLoyaltySettings: React.FC<DiscountLoyaltySettingsProps> = ({ onBack }) => {
  const [thresholds, setThresholds] = useState({
    gold: 0,
    silver: 0,
    bronze: 0,
    points: 0
  });
  const [loading, setLoading] = useState({
    fetching: true,
    saving: false
  });
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    const loadThresholds = async () => {
      try {
        setLoading(prev => ({ ...prev, fetching: true }));
        setError(null);
        const data = await fetchLoyaltyThresholds();
        setThresholds(data);
      } catch (err) {
        console.error('Failed to load thresholds:', err);
        setError(err instanceof Error ? err.message : 'Failed to load loyalty thresholds');
      } finally {
        setLoading(prev => ({ ...prev, fetching: false }));
      }
    };

    loadThresholds();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setThresholds(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(prev => ({ ...prev, saving: true }));
      setError(null);
      
      const updated = await updateLoyaltyThresholds(thresholds);
      
      setNotification({
        show: true,
        message: 'Loyalty thresholds updated successfully!',
        type: 'success'
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
    } catch (err) {
      console.error('Save error:', err);
      const errorMessage = (err instanceof Error && (err as any).response?.data?.message) ||
                          (err instanceof Error && err.message) ||
                          'Failed to save thresholds. Please try again.';
      
      setNotification({
        show: true,
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setLoading(prev => ({ ...prev, saving: false }));
    }
  };

  if (loading.fetching) {
    return (
      <div style={{ 
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px'
      }}>
        <div>Loading loyalty thresholds...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? (
            <FaCheck />
          ) : (
            <span style={{ marginRight: '10px' }}>❌</span>
          )}
          {notification.message}
        </div>
      )}

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
            disabled={loading.saving}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              background: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              opacity: loading.saving ? 0.7 : 1
            }}
          >
            <FaArrowLeft style={{ marginRight: '6px', fontSize: '12px' }} />
            Back to Loyalty
          </button>
          <button 
            onClick={handleSave}
            disabled={loading.saving}
            style={{
              padding: '6px 12px',
              background: '#008ED8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              opacity: loading.saving ? 0.7 : 1
            }}
          >
            {loading.saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
      
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '15px',
          padding: '10px',
          background: '#ffebee',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ 
        background: '#fff', 
        border: '1px solid #eee', 
        borderRadius: '4px', 
        padding: '20px',
        opacity: loading.saving ? 0.7 : 1,
        pointerEvents: loading.saving ? 'none' : 'auto'
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
              value={thresholds.gold}
              onChange={handleChange}
              disabled={loading.saving}
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
              value={thresholds.silver}
              onChange={handleChange}
              disabled={loading.saving}
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
              value={thresholds.bronze}
              onChange={handleChange}
              disabled={loading.saving}
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

        {/* Points Conversion */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <FaStar style={{ color: '#008ED8', fontSize: '16px', marginRight: '8px' }} />
            <label style={{ fontSize: '14px', fontWeight: '500' }}>
              Reward Points Earned per 100 Rupees (1 point = 1 Rupee)
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
              name="points"
              value={thresholds.points}
              onChange={handleChange}
              disabled={loading.saving}
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

      {/* Notification Styles */}
      <style>{`
        .notification {
          position: fixed;
          bottom: 20px;
          left: 20px;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: slideIn 0.3s ease-out, fadeOut 0.5s ease-in 2.5s forwards;
          min-width: 250px;
        }

        .notification.success {
          background-color: #F0FFF4;
          border-left: 5px solid #28A745;
          color: #28A745;
        }

        .notification.error {
          background-color: #FFF1F0;
          border-left: 5px solid #DC3545;
          color: #DC3545;
        }

        .notification svg {
          margin-right: 10px;
          font-size: 1.2em;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default DiscountLoyaltySettings;