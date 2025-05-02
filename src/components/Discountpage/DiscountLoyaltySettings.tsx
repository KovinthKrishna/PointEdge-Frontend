import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaStar, FaCrown, FaAward, FaMedal, FaCheck } from 'react-icons/fa';
import { fetchLoyaltyThresholds, updateLoyaltyThresholds } from '../../services/discountService';
import './styles/DiscountLoyaltySettings.css';

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
      
      await updateLoyaltyThresholds(thresholds);
      
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
      <div className="loading-container">
        <div>Loading loyalty thresholds...</div>
      </div>
    );
  }

  return (
    <div className="loyalty-settings-container">
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

      <div className="settings-header">
        <h1>Loyalty Points Settings</h1>
        <div className="header-buttons">
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
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className={`settings-card ${loading.saving ? 'disabled' : ''}`}>
        {/* Gold Membership */}
        <div className="setting-item">
          <div className="setting-label">
            <FaCrown className="setting-icon gold-icon" />
            <label className="setting-label-text">
              Loyalty Points Required for Gold Membership
            </label>
          </div>
          <div className="input-container">
            <div className="point-circle">
              <FaStar />
            </div>
            <input
              type="number"
              name="gold"
              value={thresholds.gold}
              onChange={handleChange}
              disabled={loading.saving}
              className="threshold-input"
            />
          </div>
        </div>

        {/* Silver Membership */}
        <div className="setting-item">
          <div className="setting-label">
            <FaAward className="setting-icon silver-icon" />
            <label className="setting-label-text">
              Loyalty Points Required for Silver Membership
            </label>
          </div>
          <div className="input-container">
            <div className="point-circle">
              <FaStar />
            </div>
            <input
              type="number"
              name="silver"
              value={thresholds.silver}
              onChange={handleChange}
              disabled={loading.saving}
              className="threshold-input"
            />
          </div>
        </div>

        {/* Bronze Membership */}
        <div className="setting-item">
          <div className="setting-label">
            <FaMedal className="setting-icon bronze-icon" />
            <label className="setting-label-text">
              Loyalty Points Required for Bronze Membership
            </label>
          </div>
          <div className="input-container">
            <div className="point-circle">
              <FaStar />
            </div>
            <input
              type="number"
              name="bronze"
              value={thresholds.bronze}
              onChange={handleChange}
              disabled={loading.saving}
              className="threshold-input"
            />
          </div>
        </div>

        {/* Points Conversion */}
        <div className="setting-item">
          <div className="setting-label">
            <FaStar className="setting-icon points-icon" />
            <label className="setting-label-text">
              Reward Points Earned per 100 Rupees (1 point = 1 Rupee)
            </label>
          </div>
          <div className="input-container">
            <div className="point-circle">
              <FaStar />
            </div>
            <input
              type="number"
              name="points"
              value={thresholds.points}
              onChange={handleChange}
              disabled={loading.saving}
              className="threshold-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountLoyaltySettings;