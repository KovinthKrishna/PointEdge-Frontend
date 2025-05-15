import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTrash, FaPlus, FaTimes, FaCheck } from 'react-icons/fa';
import { deleteAllItemDiscounts, fetchItemDiscountCount } from '../../services/discountService';

// Add NotificationProps interface
interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

// Add Notification Component
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

interface DiscountOptionsItemProps {
  onAddClick: () => void;
  itemCount: number;
}

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  return ReactDOM.createPortal(children, modalRoot);
};

const DiscountOptionsItem: React.FC<DiscountOptionsItemProps> = ({ 
  onAddClick,
  itemCount: initialItemCount
}) => {
  const [showFirstConfirmation, setShowFirstConfirmation] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [itemCount, setItemCount] = useState(initialItemCount);
  const [notification, setNotification] = useState<NotificationProps | null>(null);

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

  // Show notification function
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Fetch count on component mount and when initialCount changes
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetchItemDiscountCount();
        console.log('Fetched item count:', response.count);
        setItemCount(response.count);
      } catch (error) {
        console.error('Error fetching item discount count:', error);
        setItemCount(0);
      }
    };
    
    fetchCount();
  }, [initialItemCount]);

  const handleDeleteAllClick = () => {
    setShowFirstConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowFirstConfirmation(false);
    setShowPasswordConfirmation(false);
    setAdminPassword('');
    setErrorMessage('');
  };

  const handleFirstConfirmYes = () => {
    setShowFirstConfirmation(false);
    setShowPasswordConfirmation(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminPassword(e.target.value);
    setErrorMessage('');
  };

  const refreshCount = async () => {
    try {
      const response = await fetchItemDiscountCount();
      console.log('Refreshed item count:', response.count);
      setItemCount(response.count);
    } catch (error) {
      console.error('Error refreshing item discount count:', error);
      setItemCount(0);
    }
  };

  const handleFinalDelete = async () => {
    if (!adminPassword.trim()) {
      setErrorMessage('Please enter admin password');
      return;
    }

    try {
      setIsDeleting(true);
      const result = await deleteAllItemDiscounts(adminPassword.trim());
      
      if (result.success) {
        console.log("Item discounts deletion successful:", result);
        await refreshCount();
        handleCloseConfirmation();
        showNotification('All item discounts deleted successfully', 'success');
      } else {
        setErrorMessage(result.message || 'Failed to delete discounts');
        showNotification(result.message || 'Failed to delete discounts', 'error');
      }
    } catch (error) {
      console.error('Full error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Invalid admin password or server error';
      setErrorMessage(errorMsg);
      showNotification(errorMsg, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Updated modal styles to match the design system
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

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
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
              fontSize: '0.9em',
              fontWeight: 'normal',
              marginLeft: '6px',
              verticalAlign: 'center'
            }}>{itemCount}</span>
          </h1>
          <h2 style={{
            margin: '0',
            fontSize: 'clamp(14px, 3vw, 16px)',
            fontWeight: 'normal',
            color: '#666',
            lineHeight: '1.2'
          }}>
            Product-Specific Discounts
          </h2>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <button 
            onClick={handleDeleteAllClick}
            style={{
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
            }}
          >
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
            Add New Discount
          </button>
        </div>
      </div>

      {/* First confirmation modal - updated styles */}
      {showFirstConfirmation && (
        <ModalPortal>
          <div style={overlayStyle}>
            <div style={modalStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Confirm Delete All Item Discounts</h3>
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
                Are you sure you want to delete all ITEM type discounts? This action cannot be undone.
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

      {/* Password confirmation modal - updated styles */}
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
                To delete all ITEM discounts, please enter your admin password:
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
                      handleFinalDelete();
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
                  onClick={handleFinalDelete}
                  disabled={isDeleting}
                  style={{
                    padding: '8px 16px',
                    background: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isDeleting ? 'default' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    opacity: isDeleting ? 0.7 : 1,
                    transition: 'background-color 0.2s',
                  }}
                  onMouseOver={(e) => !isDeleting && (e.currentTarget.style.backgroundColor = '#DC2626')}
                  onMouseOut={(e) => !isDeleting && (e.currentTarget.style.backgroundColor = '#EF4444')}
                >
                  {isDeleting ? 'Deleting...' : 'Delete All'}
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
      
      {/* Notification Component */}
      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
};

export default DiscountOptionsItem;