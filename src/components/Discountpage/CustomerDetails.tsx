import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaArrowLeft, FaCrown, FaStar } from 'react-icons/fa';
import { getCustomerByPhone, updateCustomer, deleteCustomer2, updateCustomerById } from '../../services/customerService';
import Customer from '../../models/Customer';

interface CustomerDetailsPopupProps {
  onClose: () => void;
  customerId: string;
  onCustomerDeleted: () => void;
  onPhoneUpdated?: (newPhone: string) => void; // New prop for phone updates
}

interface OrderData {
  id: number;
  date: string;
  items: number;
  amount: number;
  points: number;
}

const CustomerDetails: React.FC<CustomerDetailsPopupProps> = ({ 
  onClose, 
  customerId,
  onCustomerDeleted,
  onPhoneUpdated
}) => {
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        setLoading(true);
        setError('');
        
        const id = parseInt(customerId);
        if (isNaN(id)) {
          throw new Error('Invalid customer ID');
        }

        const customer = await getCustomerByPhone(id.toString());
        setCustomerData(customer);

        const mockOrders: OrderData[] = [
          { id: 240, date: new Date().toLocaleString(), items: 4, amount: 4556.00, points: 27.14 },
          { id: 241, date: new Date().toLocaleString(), items: 6, amount: 7321.00, points: 45.01 },
          { id: 242, date: new Date().toLocaleString(), items: 2, amount: 3127.00, points: 21.01 },
          { id: 243, date: new Date().toLocaleString(), items: 3, amount: 10000.00, points: 56.93 },
          { id: 244, date: new Date().toLocaleString(), items: 2, amount: 732.00, points: 5.11 },
        ];
        setOrders(mockOrders);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching customer data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load customer data');
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const getTierIcon = (tier?: string) => {
    if (tier === 'GOLD') return <FaCrown color="#D4AF37" size={16} style={{ marginRight: '8px' }} />;
    return null;
  };

  const getTierName = (tier?: string) => {
    if (!tier) return 'NOT A MEMBER';
    return tier.toUpperCase() + ' MEMBER';
  };

  const getTierColor = (tier?: string) => {
    if (tier === 'GOLD') return '#D4AF37';
    return '#FFFFFF';
  };

  const handleSaveChanges = async () => {
    if (!customerData) return;

    try {
      setLoading(true);
      setError('');
      
      const id = parseInt((customerData.id ?? '').toString());
      if (isNaN(id)) {
        throw new Error('Invalid customer ID');
      }

      const oldPhone = customerId; // Store original phone before update
      await updateCustomerById(id, customerData);
      
      setSuccessMessage('Customer data saved successfully');
      setTimeout(() => setSuccessMessage(''), 3000);

      // Notify parent if phone was updated
      if (customerData.phone !== oldPhone && onPhoneUpdated) {
        onPhoneUpdated(customerData.phone);
      }
    } catch (err) {
      console.error('Error saving customer data:', err);
      setError(err instanceof Error ? err.message : 'Failed to save customer data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async () => {
    if (!customerData?.phone) return;
  
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        setLoading(true);
        setError('');
        
        console.log('Attempting to delete phone:', customerData.phone);
        
        const result = await deleteCustomer2(customerData.phone);
        console.log('Delete result:', result);
        
        if (result.success) {
          setSuccessMessage(`Customer ${customerData.phone} deleted successfully`);
          setTimeout(() => {
            onCustomerDeleted();
            onClose();
          }, 1500);
        } else {
          throw new Error(result.message || 'Failed to delete customer');
        }
      } catch (err) {
        console.error('Delete failed:', err);
        setError(err instanceof Error ? err.message : 'Deletion failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!customerData) return;
    
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value
    });
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
                  {getTierIcon(customerData.tier)}
                  <h3 style={{ 
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: getTierColor(customerData.tier)
                  }}>
                    {getTierName(customerData.tier)}
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
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>Loading orders...</div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#FF3B30' }}>{error}</div>
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
                      <div>Rs {order.amount.toFixed(2)}</div>
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
              {successMessage && (
                <div style={{
                  backgroundColor: '#4CD964',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  fontSize: '14px'
                }}>
                  {successMessage}
                </div>
              )}
              
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
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={customerData.name || ''}
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
                      cursor: 'text'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>E-mail</label>
                  <input 
                    type="email"
                    name="email"
                    value={customerData.email || ''}
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
                      cursor: 'text'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>Phone</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={customerData.phone || ''}
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
                      cursor: 'text'
                    }}
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handleDeleteCustomer}
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
    </div>,
    document.body
  );
};

export default CustomerDetails;
