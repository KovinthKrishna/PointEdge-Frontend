import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaArrowLeft, FaStar, FaCrown, FaAward, FaMedal, FaCheck, FaTimes } from 'react-icons/fa';
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

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  return ReactDOM.createPortal(children, modalRoot);
};

// Notification Component
const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      padding: '12px 24px',
      borderRadius: '4px',
      fontWeight: 500,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'slideIn 0.3s ease-out, fadeOut 0.5s ease-in 2.5s forwards',
      minWidth: '250px',
      backgroundColor: type === 'success' ? '#F0FFF4' : '#FFF1F0',
      borderLeft: `5px solid ${type === 'success' ? '#28A745' : '#DC3545'}`,
      color: type === 'success' ? '#28A745' : '#DC3545',
    }}>
      {type === 'success' ? 
        <FaCheck style={{ marginRight: '10px', fontSize: '1.2em' }} /> : 
        <FaTimes style={{ marginRight: '10px', fontSize: '1.2em' }} />
      }
      {message}
    </div>
  );
};

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
  const [snackbarNotification, setSnackbarNotification] = useState<NotificationProps | null>(null);

  // Confirmation modal states
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [originalThresholds, setOriginalThresholds] = useState({
    gold: 0,
    silver: 0,
    bronze: 0,
    points: 0
  });

  // Create modal root element on component mount
  useEffect(() => {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
    
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, []);

  // Add animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
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
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const showSnackbarNotification = (message: string, type: 'success' | 'error') => {
    setSnackbarNotification({ message, type });
    setTimeout(() => {
      setSnackbarNotification(null);
    }, 3000);
  };

  useEffect(() => {
    const loadThresholds = async () => {
      try {
        setLoading(prev => ({ ...prev, fetching: true }));
        setError(null);
        const data = await fetchLoyaltyThresholds();
        setThresholds(data);
        setOriginalThresholds(data); // Store original values
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

  // Check if values have changed
  const hasChanges = () => {
    return JSON.stringify(thresholds) !== JSON.stringify(originalThresholds);
  };

  const handleSaveClick = () => {
    if (!hasChanges()) {
      setNotification({
        show: true,
        message: 'No changes detected to save.',
        type: 'error'
      });
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 3000);
      return;
    }
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setShowPasswordConfirmation(false);
    setAdminPassword('');
    setErrorMessage('');
  };

  const handleFirstConfirmYes = () => {
    setShowConfirmation(false);
    setShowPasswordConfirmation(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminPassword(e.target.value);
    setErrorMessage('');
  };

  const handleFinalSave = async () => {
    if (!adminPassword.trim()) {
      setErrorMessage('Please enter admin password');
      return;
    }
  
    try {
      setLoading(prev => ({ ...prev, saving: true }));
      setError(null);
      console.log("Attempting to save with password:", adminPassword);
      
      // Pass the admin password to the update function for validation
      const result = await updateLoyaltyThresholds(thresholds, adminPassword.trim());
      
      if (!result.success) {
        console.log("Save failed:", result.message);
        setErrorMessage(result.message || 'Failed to save thresholds');
        showSnackbarNotification(result.message || 'Failed to save thresholds', 'error');
        return;
      }
      
      console.log("Save successful");
      setOriginalThresholds(thresholds); // Update original values
      handleCloseConfirmation();
      
      // Show snackbar notification instead of the old notification
      showSnackbarNotification('Loyalty thresholds updated successfully!', 'success');
      
    } catch (err) {
      console.error('Full error:', err);
      const errorMessage = err instanceof Error ? err.message : 
                          'Invalid admin password or server error';
      
      setErrorMessage(errorMessage);
      showSnackbarNotification(errorMessage, 'error');
    } finally {
      setLoading(prev => ({ ...prev, saving: false }));
    }
  };

  // Modal styles
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    position: 'relative'
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
            onClick={handleSaveClick}
            disabled={loading.saving}
            style={{
              padding: '6px 12px',
              background: hasChanges() ? '#008ED8' : '#cccccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading.saving ? 'default' : (hasChanges() ? 'pointer' : 'not-allowed'),
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

      {/* First confirmation modal */}
      {showConfirmation && (
        <ModalPortal>
          <div style={overlayStyle}>
            <div style={modalStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Confirm Save Settings</h3>
                <button 
                  onClick={handleCloseConfirmation}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6B7280',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <p style={{ 
                margin: '0 0 20px 0', 
                color: '#4B5563', 
                fontSize: '14px', 
                lineHeight: '1.5'
              }}>
                Are you sure you want to save these loyalty threshold settings? This will affect all future loyalty calculations.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  onClick={handleCloseConfirmation}
                  style={{
                    padding: '8px 16px',
                    background: '#F9FAFB',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                >
                  Cancel
                </button>
                <button
                  onClick={handleFirstConfirmYes}
                  style={{
                    padding: '8px 16px',
                    background: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#DC2626'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#EF4444'}
                >
                  Yes, Continue
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

      {/* Password confirmation modal */}
      {showPasswordConfirmation && (
        <ModalPortal>
          <div style={overlayStyle}>
            <div style={modalStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Admin Authentication Required</h3>
                <button 
                  onClick={handleCloseConfirmation}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6B7280',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <p style={{ 
                margin: '0 0 20px 0', 
                color: '#4B5563', 
                fontSize: '14px', 
                lineHeight: '1.5'
              }}>
                To save loyalty threshold settings, please enter your admin password:
              </p>
              
              <div style={{ marginTop: '15px' }}>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={handlePasswordChange}
                  placeholder="Admin password"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleFinalSave();
                    }
                  }}
                />
                {errorMessage && (
                  <div style={{ 
                    backgroundColor: '#FEF2F2', 
                    color: '#B91C1C', 
                    padding: '12px', 
                    borderRadius: '6px', 
                    marginTop: '12px',
                    marginBottom: '16px',
                    fontSize: '14px',
                    border: '1px solid #FECACA'
                  }}>
                    {errorMessage}
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  onClick={handleCloseConfirmation}
                  style={{
                    padding: '8px 16px',
                    background: '#F9FAFB',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                >
                  Cancel
                </button>
                <button
                  onClick={handleFinalSave}
                  disabled={loading.saving}
                  style={{
                    padding: '8px 16px',
                    background: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading.saving ? 'default' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    opacity: loading.saving ? 0.7 : 1,
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => !loading.saving && (e.currentTarget.style.backgroundColor = '#DC2626')}
                  onMouseOut={(e) => !loading.saving && (e.currentTarget.style.backgroundColor = '#EF4444')}
                >
                  {loading.saving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
      
      {/* Snackbar Notification Component */}
      {snackbarNotification && <Notification message={snackbarNotification.message} type={snackbarNotification.type} />}
    </div>
  );
};

export default DiscountLoyaltySettings;