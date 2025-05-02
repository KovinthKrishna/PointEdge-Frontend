import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaArrowLeft, FaAward, FaCrown, FaMedal, FaStar, FaCheck, FaTimes } from 'react-icons/fa';
import { 
  getCustomerByPhone, 
  updateCustomerById, 
  deleteCustomer2, 
  getCustomerTierByPhone,
  fetchCustomerOrders
} from '../../services/customerService';
import Customer from '../../models/Customer';
import './styles/CustomerDetails.css';

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
    <div className={`notification ${type}`}>
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

  return ReactDOM.createPortal(
    <div className="customer-details-overlay">
      <div className="customer-details-backdrop" onClick={onClose} />
      
      <div className="customer-details-container">
        {/* Left Sidebar */}
        <div className="customer-details-sidebar">
          <button className="back-button" onClick={onClose}>
            <FaArrowLeft color="#003049" size={20} />
          </button>
          
          {/* Customer Summary */}
          <div className="customer-summary">
            {loading ? (
              <div className="loading-message">Loading customer info...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : customerData ? (
              <div className="customer-card">
                <div className="customer-tier">
                  {getTierIcon(customerTier)}
                  <h3 style={{ color: getTierColor(customerTier) }}>
                    {getTierName(customerTier)}
                  </h3>
                </div>
                <div className="customer-id">
                  Customer ID {customerData.id}
                </div>
                <div className="customer-points">
                  {customerData.points?.toFixed(2) || '0.00'}
                  <FaStar color="#4CD964" size={16} style={{ marginLeft: '8px' }} />
                </div>
                <div className="points-label">
                  Loyalty Points
                </div>
              </div>
            ) : (
              <div className="error-message">Customer not found</div>
            )}
          </div>
          
          {/* Order History */}
          <div className="section-title">Order History</div>
          
          <div className="orders-container">
            {ordersLoading ? (
              <div className="loading-message">Loading orders...</div>
            ) : ordersError ? (
              <div className="error-message">{ordersError}</div>
            ) : orders.length === 0 ? (
              <div className="empty-message">No order history found</div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-number">Order #{order.id}</div>
                    <div className="order-date">{order.date}</div>
                  </div>
                  
                  <div className="order-details">
                    <div className="items-count">{order.items} items</div>
                    <div className="order-amount">
                      <div>{formatCurrency(order.amount)}</div>
                      <div className="points-badge">
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
        <div className="customer-details-content">
          <div className="content-header">
            <h1>Customer Details</h1>
            <p>*Become a loyalty customer to access exclusive benefits*</p>
          </div>
          
          {loading && !customerData ? (
            <div className="loading-message">Loading customer details...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : !customerData ? (
            <div className="error-message">Customer not found</div>
          ) : (
            <>
              {/* Customer Form */}
              <div className="customer-form">
                <h4>Customer's personal data</h4>
                
                <div className="form-group">
                  <label>Title</label>
                  <select
                    name="title"
                    value={customerData.title || 'MR'}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="MR">Mr.</option>
                    <option value="MRS">Mrs.</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                  <label>Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={customerData.name || ''}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                  {errors.name && (
                    <div className="error-text">
                      {errors.name}
                    </div>
                  )}
                </div>
                
                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label>E-mail</label>
                  <input 
                    type="email"
                    name="email"
                    value={customerData.email || ''}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                  {errors.email && (
                    <div className="error-text">
                      {errors.email}
                    </div>
                  )}
                </div>
                
                <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
                  <label>Phone</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={customerData.phone || ''}
                    onChange={handleInputChange}
                    maxLength={10}
                    className="form-control"
                  />
                  {errors.phone && (
                    <div className="error-text">
                      {errors.phone}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="action-buttons">
                <button 
                  onClick={handleDeleteClick}
                  disabled={loading}
                  className="delete-button"
                >
                  Delete Customer
                </button>
                
                <button 
                  onClick={handleSaveChanges}
                  disabled={loading}
                  className="save-button"
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
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button 
                onClick={handleCloseConfirmation}
                className="close-button"
              >
                <FaTimes size={16} />
              </button>
            </div>
            <p className="modal-message">
              Are you sure you want to delete this customer? This action cannot be undone.
            </p>
            
            {deleteError && (
              <div className="modal-error">
                {deleteError}
              </div>
            )}
            
            <div className="modal-footer">
              <button
                onClick={handleCloseConfirmation}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="confirm-button"
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