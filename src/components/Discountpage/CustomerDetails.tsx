import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { FaArrowLeft, FaAward, FaCrown, FaMedal, FaStar, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
=======
import { FaArrowLeft, FaAward, FaCrown, FaMedal, FaStar, FaCheck, FaTimes } from 'react-icons/fa';
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
import { 
  getCustomerByPhone, 
  updateCustomerById, 
  deleteCustomer2, 
  getCustomerTierByPhone,
  fetchCustomerOrders
} from '../../services/customerService';
import Customer from '../../models/Customer';
<<<<<<< HEAD
=======
import './styles/CustomerDetails.css';
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc

interface CustomerDetailsPopupProps {
  onClose: () => void;
  customerId: string;
  onCustomerDeleted: () => void;
  onPhoneUpdated?: (newPhone: string) => void;
}

interface OrderData {
  id: number;
  date: string;
  items: number;
  amount: number;
  points: number;
}

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

// Notification Component
const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
<<<<<<< HEAD
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
=======
    <div className={`notification ${type}`}>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      {type === 'success' ? 
        <FaCheck style={{ marginRight: '10px', fontSize: '1.2em' }} /> : 
        <FaTimes style={{ marginRight: '10px', fontSize: '1.2em' }} />
      }
      {message}
    </div>
  );
};

const CustomerDetails: React.FC<CustomerDetailsPopupProps> = ({ 
  onClose, 
  customerId,
  onCustomerDeleted,
  onPhoneUpdated
}) => {
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [customerTier, setCustomerTier] = useState<string>('NOTLOYALTY');
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState('');
  const [ordersError, setOrdersError] = useState('');
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });
  // Delete confirmation states
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  
  // Validation functions - match CustomerAdd
  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email: string | null | undefined): boolean => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };
  
  // Style for animations
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
<<<<<<< HEAD

=======
  
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  // Show notification function
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch customer data and tier in parallel
        const [customer, tier] = await Promise.all([
          getCustomerByPhone(customerId),
          getCustomerTierByPhone(customerId)
        ]);

        setCustomerData(customer);
        setCustomerTier(tier || 'NOTLOYALTY');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customer data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load customer data');
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        setOrdersError('');
        
        // Fetch real order data
        const orderData = await fetchCustomerOrders(customerId);
        const formattedOrderData = orderData.map(order => ({
          ...order,
          id: Number(order.id), // Convert id to number
        }));
        setOrders(formattedOrderData);
        setOrdersLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setOrdersError(err instanceof Error ? err.message : 'Failed to load order history');
        setOrdersLoading(false);
      }
    };

    fetchCustomerDetails();
    fetchOrders();
  }, [customerId]);

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const getTierIcon = (tier?: string) => {
    if (!tier) return null;
    switch(tier.toUpperCase()) {
      case 'GOLD': 
        return <FaCrown color="#FFD700" size={16} style={{ marginRight: '8px' }} />;
      case 'SILVER': 
        return <FaMedal color="#C0C0C0" size={16} style={{ marginRight: '8px' }} />;
      case 'BRONZE': 
        return <FaAward color="#CD7F32" size={16} style={{ marginRight: '8px' }} />;
      default: 
        return null;
    }
  };

  const getTierName = (tier?: string) => {
    if (!tier || tier === 'NOTLOYALTY') return 'NOT A MEMBER';
    return tier.toUpperCase() + ' MEMBER';
  };

  const getTierColor = (tier?: string) => {
    if (!tier) return '#FFFFFF';
    switch(tier.toUpperCase()) {
      case 'GOLD': return '#FFD700';
      case 'SILVER': return '#C0C0C0';
      case 'BRONZE': return '#CD7F32';
      default: return '#FFFFFF';
    }
  };

  const validateCustomerData = (): boolean => {
    if (!customerData) return false;
    
    const newErrors = {
      name: '',
      email: '',
      phone: ''
    };
    
    let isValid = true;
    
    // Validate name (required and must contain only letters and spaces)
    if (!customerData.name || customerData.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (!validateName(customerData.name)) {
      newErrors.name = 'Name can only contain letters and spaces';
      isValid = false;
    }
    
    // Validate phone (required and must be exactly 10 digits)
    if (!customerData.phone || customerData.phone.trim() === '') {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!validatePhone(customerData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }
    
    // Validate email (optional but must be valid if provided)
    if (customerData.email && !validateEmail(customerData.email)) {
      newErrors.email = 'Please enter a valid email address';
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

  const handleSaveChanges = async () => {
    if (!customerData) return;
    
    // Validate form data
    if (!validateCustomerData()) return;

    try {
      setLoading(true);
      setError('');
      
      const id = parseInt((customerData.id ?? '').toString());
      if (isNaN(id)) {
        throw new Error('Invalid customer ID');
      }

      const oldPhone = customerId;
      await updateCustomerById(id, customerData);
      
      showNotification('Customer data saved successfully', 'success');

      if (customerData.phone !== oldPhone && onPhoneUpdated) {
        onPhoneUpdated(customerData.phone);
      }
    } catch (err) {
      console.error('Error saving customer data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save customer data';
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Delete confirmation handlers
  const handleDeleteClick = () => {
    setDeleteError(null);
    setShowDeleteConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowDeleteConfirmation(false);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!customerData?.phone) return;
    
    try {
      setIsDeleting(true);
      setDeleteError(null);
      
      // Close the confirmation dialog immediately
      setShowDeleteConfirmation(false);
      
      const result = await deleteCustomer2(customerData.phone);
      
      if (result.success) {
        showNotification(`Customer ${customerData.phone} deleted successfully`, 'success');
        setTimeout(() => {
          onCustomerDeleted();
          onClose();
        }, 1500);
      } else {
        setDeleteError(result.message || 'Failed to delete customer');
        // Show error notification since we already closed the dialog
        showNotification(result.message || 'Failed to delete customer', 'error');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete customer. Please try again.';
      // Show error notification since we already closed the dialog
      showNotification(errorMessage, 'error');
    } finally {
      setIsDeleting(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!customerData) return;
    
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Format currency value
  const formatCurrency = (amount: number) => {
    return `Rs ${amount.toFixed(2)}`;
  };

  // Modal styles for delete confirmation
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

  return ReactDOM.createPortal(
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
      }} onClick={onClose} />
      
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
        {/* Left Sidebar */}
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
            onClick={onClose}
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
          
          {/* Customer Summary */}
          <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '20px' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>Loading customer info...</div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#FF3B30' }}>{error}</div>
            ) : customerData ? (
              <div style={{ 
                backgroundColor: '#00253A',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                  {getTierIcon(customerTier)}
                  <h3 style={{ 
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: getTierColor(customerTier)
                  }}>
                    {getTierName(customerTier)}
                  </h3>
                </div>
                <div style={{ 
                  fontSize: '12px',
                  color: '#fff',
                  marginBottom: '10px'
                }}>
                  Customer ID {customerData.id}
                </div>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                  color:'#4CD964'
                }}>
                  {customerData.points?.toFixed(2) || '0.00'}
                  <FaStar color="#4CD964" size={16} style={{ marginLeft: '8px' }} />
                </div>
                <div style={{ 
                  fontSize: '14px',
                  color: '#fff'
                }}>
                  Loyalty Points
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#FF3B30' }}>Customer not found</div>
            )}
          </div>
          
          {/* Order History */}
          <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>Order History</div>
          
          <div style={{ flex: 1, overflow: 'auto' }}>
            {ordersLoading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>Loading orders...</div>
            ) : ordersError ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#FF3B30' }}>{ordersError}</div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>No order history found</div>
            ) : (
              orders.map((order) => (
                <div key={order.id} style={{
                  backgroundColor: '#00253A',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '10px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontSize: '12px', color: '#CCC' }}>Order #{order.id}</div>
                    <div style={{ fontSize: '12px', color: '#CCC' }}>{order.date}</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px' }}>{order.items} items</div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <div>{formatCurrency(order.amount)}</div>
                      <div style={{ 
                        backgroundColor: '#4CD964', 
                        color: 'white', 
                        padding: '2px 12px', 
                        borderRadius: '12px',
                        fontSize: '12px' 
                      }}>
                        +{order.points.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Right Content */}
        <div style={{
          width: '60%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{ marginBottom: '5px', fontSize: '22px' }}>Customer Details</h1>
            <p style={{ color: '#999', margin: '0', fontSize: '13px' }}>*Become a loyalty customer to access exclusive benefits*</p>
          </div>
          
          {loading && !customerData ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading customer details...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#FF3B30' }}>{error}</div>
          ) : !customerData ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#FF3B30' }}>Customer not found</div>
          ) : (
            <>
              {/* Customer Form */}
              <div style={{ 
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <h4 style={{ 
                  margin: '0 0 15px 0',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  Customer's personal data
                </h4>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>Title</label>
                  <select
                    name="title"
                    value={customerData.title || 'MR'}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: '1px solid #CCC',
                      borderRadius: '6px',
                      fontSize: '14px',
                      height: '40px',
                      boxSizing: 'border-box',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="MR">Mr.</option>
                    <option value="MRS">Mrs.</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: errors.name ? '5px' : '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={customerData.name || ''}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: `1px solid ${errors.name ? '#FF3B30' : '#CCC'}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      height: '40px',
                      boxSizing: 'border-box',
                      backgroundColor: 'white',
                      cursor: 'text'
                    }}
                  />
                  {errors.name && (
                    <div style={{ color: '#FF3B30', fontSize: '12px', marginTop: '5px' }}>
                      {errors.name}
                    </div>
                  )}
                </div>
                
                <div style={{ marginBottom: errors.email ? '5px' : '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>E-mail</label>
                  <input 
                    type="email"
                    name="email"
                    value={customerData.email || ''}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: `1px solid ${errors.email ? '#FF3B30' : '#CCC'}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      height: '40px',
                      boxSizing: 'border-box',
                      backgroundColor: 'white',
                      cursor: 'text'
                    }}
                  />
                  {errors.email && (
                    <div style={{ color: '#FF3B30', fontSize: '12px', marginTop: '5px' }}>
                      {errors.email}
                    </div>
                  )}
                </div>
                
                <div style={{ marginBottom: errors.phone ? '5px' : '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>Phone</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={customerData.phone || ''}
                    onChange={handleInputChange}
                    maxLength={10}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      border: `1px solid ${errors.phone ? '#FF3B30' : '#CCC'}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      height: '40px',
                      boxSizing: 'border-box',
                      backgroundColor: 'white',
                      cursor: 'text'
                    }}
                  />
                  {errors.phone && (
                    <div style={{ color: '#FF3B30', fontSize: '12px', marginTop: '5px' }}>
                      {errors.phone}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handleDeleteClick}
                  disabled={loading}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FF3B30',
                    border: '1px solid #FF3B30',
                    borderRadius: '6px',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: '14px',
                    opacity: loading ? 0.5 : 1
                  }}
                >
                  Delete Customer
                </button>
                
                <button 
                  onClick={handleSaveChanges}
                  disabled={loading}
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
                    opacity: loading ? 0.5 : 1
                  }}
                >
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#111827' }}>Confirm Delete</h3>
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
              Are you sure you want to delete this customer? This action cannot be undone.
            </p>
            
            {deleteError && (
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
                {deleteError}
              </div>
            )}
            
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
                onClick={handleConfirmDelete}
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
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Notification Component */}
      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>,
    document.body
  );
};

export default CustomerDetails;