import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaTrash, FaCog, FaUsers, FaPlus, FaTimes } from 'react-icons/fa';
import { deleteAllLoyaltyDiscounts, fetchLoyaltyDiscountCount } from '../../services/discountService';

interface DiscountOptionsLoyaltyProps {
  onSettingsClick: () => void;
  onAddClick: () => void;
  loyaltyCount: number;
}

const CustomerLoyaltyOptions: React.FC<DiscountOptionsLoyaltyProps> = ({ 
  onSettingsClick,
  onAddClick,
  loyaltyCount: initialLoyaltyCount
}) => {
  const navigate = useNavigate();
  const [loyaltyCount, setLoyaltyCount] = useState(0);
  const [showFirstConfirmation, setShowFirstConfirmation] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCustomersClick = () => {
    navigate('/admin/discounts/customers', {
      state: { background: window.location.pathname }
        
    });
  };

  // Fetch count on component mount and when initialCount changes
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetchLoyaltyDiscountCount();
        console.log('Fetched loyalty count:', response.count);
        setLoyaltyCount(response.count);
      } catch (error) {
        console.error('Error fetching loyalty discount count:', error);
        setLoyaltyCount(0);
      }
    };
    
    fetchCount();
  }, [initialLoyaltyCount]);

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
      const response = await fetchLoyaltyDiscountCount();
      console.log('Refreshed loyalty count:', response.count);
      setLoyaltyCount(response.count);
    } catch (error) {
      console.error('Error refreshing loyalty discount count:', error);
      setLoyaltyCount(0);
    }
  };

  const handleFinalDelete = async () => {
    if (!adminPassword.trim()) {
      setErrorMessage('Please enter admin password');
      return;
    }

    try {
      setIsDeleting(true);
      const result = await deleteAllLoyaltyDiscounts(adminPassword.trim());
      
      if (result.success) {
        console.log("Loyalty discounts deletion successful:", result);
        await refreshCount();
        handleCloseConfirmation();
      } else {
        setErrorMessage(result.message || 'Failed to delete discounts');
      }
    } catch (error) {
      console.error('Full error:', error);
      setErrorMessage(
        error instanceof Error ? error.message : 
        'Invalid admin password or server error'
      );
    } finally {
      setIsDeleting(false);
    }
  };

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
    zIndex: 1000
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
        gap: '20px',
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
            Loyalty Discounts <span style={{
              color: '#008ED8',
              fontSize: '0.9em',
              fontWeight: 'normal',
              marginLeft: '6px',
              verticalAlign: 'center'
            }}>{loyaltyCount}</span>
          </h1>
          <h2 style={{
            margin: '0',
            fontSize: 'clamp(14px, 3vw, 16px)',
            fontWeight: 'normal',
            color: '#666',
            lineHeight: '1.2'
          }}>
            Loyal Customers, Smarter Rewards!
          </h2>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <button 
            onClick={onSettingsClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: 'clamp(12px, 2.5vw, 14px)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <FaCog style={{ marginRight: '8px', fontSize: '14px', color: '#666' }} />
            Settings
          </button>
          
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
          
          <button 
            onClick={handleCustomersClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              background: '#008ED8',
              color: '#fff',
              border: '1px solid #008ED8',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: 'clamp(12px, 2.5vw, 14px)',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <FaUsers style={{ marginRight: '8px', fontSize: '14px' }} />
            Customers
          </button>
        </div>
      </div>
      
      {/* Confirmation modals remain the same since they're local UI states */}
      {showFirstConfirmation && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Confirm Delete All Loyalty Discounts</h3>
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
              Are you sure you want to delete all LOYALTY type discounts? This action cannot be undone.
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
      )}

      {showPasswordConfirmation && (
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
              To delete all LOYALTY discounts, please enter your admin password:
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
      )}
    </div>
  );
};

export default CustomerLoyaltyOptions;