import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import shopping from '../../assets/shopping.png';
import { addCustomer } from '../../services/customerService';

interface Customer {
  id?: number;
  name: string;
  title: 'MR' | 'MRS' | 'OTHER';
  email?: string | null;
  phone: string;
  points: number;
  tier: 'GOLD' | 'SILVER' | 'BRONZE' | 'NOTLOYALTY';
}

interface AddCustomerPopupProps {
  onClose: () => void;
  onCustomerAdded: (newCustomer: Customer) => void;
}

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

// Notification Component
const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div className={`notification ${type}`} style={{
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

const CustomerAdd: React.FC<AddCustomerPopupProps> = ({ onClose, onCustomerAdded }) => {
  const [customerData, setCustomerData] = useState<Omit<Customer, 'id' | 'points' | 'tier'>>({
    title: 'MR',
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [notification, setNotification] = useState<NotificationProps | null>(null);

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

  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (field: keyof typeof customerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      email: '',
      phone: ''
    };

    let isValid = true;

    // Validate name
    if (!customerData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (!validateName(customerData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
      isValid = false;
    }

    // Validate email
    if (customerData.email && !validateEmail(customerData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate phone
    if (!customerData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!validatePhone(customerData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    
    if (!isValid) {
      // Show notification for the first error
      for (const key in newErrors) {
        if (newErrors[key as keyof typeof newErrors]) {
          showNotification(newErrors[key as keyof typeof newErrors], 'error');
          break;
        }
      }
    }
    
    return isValid;
  };

  const handleAddCustomer = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const completeCustomerData: Customer = {
        ...customerData,
        points: 0,
        tier: 'NOTLOYALTY',
        email: customerData.email || null
      };

      const newCustomer = await addCustomer(completeCustomerData);
      
      // Show success notification
      showNotification('Customer added successfully', 'success');
      
      // Wait a bit to show the success message before closing
      setTimeout(() => {
        onCustomerAdded(newCustomer);
        handleCancel();
      }, 1500);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add customer. Please try again.'
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCustomerData({
      title: 'MR',
      name: '',
      email: '',
      phone: ''
    });
    setErrors({
      name: '',
      email: '',
      phone: ''
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99999,
    }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 1,
      }} onClick={handleCancel} />
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '1000px',
        height: '90vh',
        maxHeight: '700px',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
        zIndex: 2,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
      }}>
        <div style={{
          width: '40%',
          backgroundColor: '#003049',
          color: 'white',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          <button 
            onClick={handleCancel}
            style={{
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'absolute',
              top: '16px',
              left: '16px',
            }}
          >
            <FaArrowLeft color="#003049" size={20} />
          </button>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%' 
          }}>
            <div style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <img src={logo} alt="Point Edge Logo" style={{ width: '80px', height: '80px' }} />
                  <span style={{ 
                    fontWeight: 'bold', 
                    fontSize: '30px',
                    color: '#4AA3DF' 
                  }}>Point Edge</span>
                </div>
              </div>
            </div>
          </div> 
          <img src={shopping} alt="Shopping" style={{ width: '598px', height: '417px', paddingBottom:'30px' }} /> 
        </div>
        
        <div style={{
          width: '60%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{ marginBottom: '5px', fontSize: '22px' }}>Customer</h1>
            <p style={{ color: '#999', margin: '0', fontSize: '13px', fontStyle: 'italic' }}>
              "Become a loyalty customer to access exclusive benefits."
            </p>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Personal</h2>
          </div>
          
          <div style={{ 
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h3 style={{ 
              margin: '0 0 15px 0',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              Your personal data
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Title</div>
              <select
                value={customerData.title}
                onChange={(e) => handleInputChange('title', e.target.value as 'MR' | 'MRS' | 'OTHER')}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: '1px solid #CCC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box',
                  backgroundColor: 'white',
                  appearance: 'none'
                }}
              >
                <option value="MR">Mr.</option>
                <option value="MRS">Mrs.</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            
            <div style={{ marginBottom: errors.name ? '5px' : '15px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Name</div>
              <input 
                type="text" 
                value={customerData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: `1px solid ${errors.name ? '#FF3B30' : '#CCC'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.name && (
                <div style={{ color: '#FF3B30', fontSize: '12px', marginTop: '5px' }}>
                  {errors.name}
                </div>
              )}
            </div>
            
            <div style={{ marginBottom: errors.email ? '5px' : '15px' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>E-mail (optional)</div>
              <input 
                type="email" 
                value={customerData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: `1px solid ${errors.email ? '#FF3B30' : '#CCC'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.email && (
                <div style={{ color: '#FF3B30', fontSize: '12px', marginTop: '5px' }}>
                  {errors.email}
                </div>
              )}
            </div>
            
            <div style={{ marginBottom: errors.phone ? '5px' : '0' }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Phone</div>
              <input 
                type="tel" 
                value={customerData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                maxLength={10}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: `1px solid ${errors.phone ? '#FF3B30' : '#CCC'}`,
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.phone && (
                <div style={{ color: '#FF3B30', fontSize: '12px', marginTop: '5px' }}>
                  {errors.phone}
                </div>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleCancel}
              style={{
                backgroundColor: 'transparent',
                color: '#FF3B30',
                border: '1px solid #FF3B30',
                borderRadius: '6px',
                padding: '10px 15px',
                cursor: 'pointer',
                flex: 1,
                fontWeight: 'bold',
                fontSize: '14px'
              }}
              disabled={loading}
            >
              Cancel
            </button>
            
            <button 
              onClick={handleAddCustomer}
              style={{
                backgroundColor: '#1C1C1E',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 15px',
                cursor: 'pointer',
                flex: 1,
                fontWeight: 'bold',
                fontSize: '14px',
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Customer'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Notification Component */}
      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
};

export default CustomerAdd;