import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaArrowLeft, FaUsers, FaPlus, FaSearch, FaCrown, FaMedal, FaAward, FaTrophy, FaTimes } from 'react-icons/fa';
import CustomerDetails from './CustomerDetails';
import CustomerAdd from './CustomerAdd';
import { fetchAllCustomers, fetchCustomerCountsByTier, searchCustomers } from '../../services/customerService';
import Customer from '../../models/Customer';
import '../../components/Discountpage/styles/CustomerFind.css';

interface CustomersPopupProps {
  onClose: () => void;
  onBackToPayment?: () => void;
  openedFrom?: 'payment' | 'discount'; 
}

interface CustomerListItem {
  id: string;
  customerId: string;
  phone: string;
  amount: number;
  discount: number;
  date: string;
  points: number;
  tier?: 'GOLD' | 'SILVER' | 'BRONZE' | 'NOTLOYALTY';
}

const CustomerOrders: React.FC<CustomersPopupProps> = ({ 
  onClose, 
  onBackToPayment,
  openedFrom = 'discount' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customerData, setCustomerData] = useState<Partial<Customer>>({
    title: 'MR',
    name: '',
    email: '',
    phone: '',
  });
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showAddCustomerPopup, setShowAddCustomerPopup] = useState(false);
  const [customers, setCustomers] = useState<CustomerListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tierCounts, setTierCounts] = useState({
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
    NOTLOYALTY: 0
  });
  const [error, setError] = useState('');
  const [fieldsEditable, setFieldsEditable] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const sortedCustomers = [...customers].sort((a, b) => b.points - a.points);

  // FIXED: Back arrow only works when coming from discount page (admin page)
  const handleBackArrowClick = () => {
    if (openedFrom === 'discount') {
      onClose(); // Only close if coming from discount page
    }
  };

  // FIXED: Close button now only closes this popup, not the payment popup
  const handleCloseButtonClick = () => {
    onClose(); // Just close this popup
  };

  // FIXED: Backdrop click - only works from discount page
  const handleBackdropClick = () => {
    if (openedFrom === 'discount') {
      onClose(); // Only close if coming from discount page
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const [allCustomers, countsByTier] = await Promise.all([
        fetchAllCustomers(),
        fetchCustomerCountsByTier()
      ]);
      
      const transformedCustomers = allCustomers.map(c => ({
        id: `#${c.id}`,
        customerId: c.phone,
        phone: c.phone,
        amount: 0,
        discount: 0,
        date: new Date().toLocaleString(),
        points: c.points || 0,
        tier: c.tier
      }));
      
      setCustomers(transformedCustomers);
      setTierCounts(countsByTier);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load customer data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [refreshTrigger]);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!searchQuery) {
        setCustomerData({
          title: 'MR',
          name: '',
          email: '',
          phone: '',
        });
        setFieldsEditable(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const customer = await searchCustomers(searchQuery);
        setCustomerData({
          title: customer[0]?.title || 'MR',
          name: customer[0]?.name || '',
          email: customer[0]?.email || '',
          phone: customer[0]?.phone || searchQuery
        });
        setFieldsEditable(false);
      } catch (err) {
        console.error('Error searching customer:', err);
        setCustomerData({
          title: 'MR',
          name: '',
          email: '',
          phone: searchQuery
        });
        setFieldsEditable(false);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchCustomerData, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleCustomerClick = (phone: string) => {
    setSearchQuery(phone);
    setFieldsEditable(false);
  };

  const handleAddCustomerSuccess = (newCustomer: Customer) => {
    setRefreshTrigger(prev => prev + 1);
    setShowAddCustomerPopup(false);
    setSearchQuery(newCustomer.phone);
    setFieldsEditable(false);
  };

  const handleCustomerDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
    setSearchQuery('');
    setCustomerData({
      title: 'MR',
      name: '',
      email: '',
      phone: '',
    });
    setShowDetailsPopup(false);
  };

  const handleCloseDetailsPopup = async () => {
    setShowDetailsPopup(false);
    setRefreshTrigger(prev => prev + 1);
    
    if (customerData.phone) {
      try {
        const updatedCustomerData = await searchCustomers(customerData.phone);
        if (updatedCustomerData && updatedCustomerData.length > 0) {
          setCustomerData({
            title: updatedCustomerData[0].title || 'MR',
            name: updatedCustomerData[0].name || '',
            email: updatedCustomerData[0].email || '',
            phone: updatedCustomerData[0].phone || customerData.phone
          });
        }
      } catch (err) {
        console.error('Error refreshing customer data:', err);
      }
    }
  };

  const handlePhoneUpdated = (newPhone: string) => {
    setSearchQuery(newPhone);
  };

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const getTierIcon = (tier?: 'GOLD' | 'SILVER' | 'BRONZE' | 'NOTLOYALTY') => {
    switch(tier) {
      case 'GOLD': return <FaCrown color="#FFD700" size={16} />;
      case 'SILVER': return <FaMedal color="#C0C0C0" size={16} />;
      case 'BRONZE': return <FaAward color="#CD7F32" size={16} />;
      default: return null;
    }
  };

  const getPositionIcon = (index: number) => {
    switch(index) {
      case 0: return <FaTrophy color="#FFD700" size={16} className="trophy-icon gold bounce" />;
      case 1: return <FaTrophy color="#C0C0C0" size={16} className="trophy-icon gold bounce" />;
      case 2: return <FaTrophy color="#CD7F32" size={16} className="trophy-icon gold bounce" />;
      default: return null;
    }
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
      }} onClick={handleBackdropClick} />
      
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
          {/* FIXED: Back Arrow Button - Disabled when coming from payment (admin protection) */}
          <button 
            onClick={handleBackArrowClick}
            disabled={openedFrom === 'payment'}
            style={{
              background: openedFrom === 'payment' ? '#ccc' : 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: openedFrom === 'payment' ? 'not-allowed' : 'pointer',
              position: 'absolute',
              top: '16px',
              left: '16px',
              opacity: openedFrom === 'payment' ? 0.5 : 1,
            }}
            title={openedFrom === 'payment' ? 'Admin page access restricted' : 'Back to Discount Page'}
          >
            <FaArrowLeft color={openedFrom === 'payment' ? '#999' : '#003049'} size={20} />
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '20px' }}>
            <div style={{ margin: '0 auto', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FaUsers color="white" size={42} />
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaCrown color="#FFD700" size={16} className="trophy-icon silver shake" />
                <span>{tierCounts.GOLD}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaMedal color="#C0C0C0" size={16} className="trophy-icon silver shake"/>
                <span>{tierCounts.SILVER}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaAward color="#CD7F32" size={16} className="trophy-icon silver shake"/>
                <span>{tierCounts.BRONZE}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaUsers color="#999" size={16} className="trophy-icon bronze pulse"/>
                <span>{tierCounts.NOTLOYALTY}</span>
              </div>
            </div>
            <div style={{ fontSize: '24px' }}>
              <span style={{ color: '#FF3B30', fontWeight: 'bold' }}>
                {tierCounts.GOLD + tierCounts.SILVER + tierCounts.BRONZE + tierCounts.NOTLOYALTY}
              </span>
              <span style={{ marginLeft: '10px' }}>Total Customers</span>
            </div>
          </div>
          
          <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>Top Customers</div>
          
          <div style={{ flex: 1, overflow: 'auto' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#FF3B30' }}>{error}</div>
            ) : sortedCustomers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>No customers found</div>
            ) : (
              sortedCustomers.map((customer, index) => (
                <div 
                  key={customer.id} 
                  style={{
                    backgroundColor: customer.phone === customerData.phone ? '#015E8C' : '#00253A',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    borderLeft: index < 3 ? `4px solid ${index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'}` : 'none'
                  }}
                  onClick={() => handleCustomerClick(customer.phone)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontSize: '12px', color: '#CCC' }}>
                      {index < 3 && <span style={{ marginRight: '5px' }}>{getPositionIcon(index)}</span>}
                      Customer ID {customer.id}
                    </div>
                    <div style={{ fontSize: '12px', color: '#CCC' }}>{customer.date}</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>{customer.phone}</div>
                      {customer.tier && customer.tier !== 'NOTLOYALTY' && (
                        <div style={{ marginLeft: '8px' }}>{getTierIcon(customer.tier)}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <div>Points: </div>
                      <div style={{ 
                        backgroundColor: '#4CD964', 
                        color: 'white', 
                        padding: '2px 12px', 
                        borderRadius: '12px',
                        fontSize: '12px',
                        marginTop: '4px'
                      }}>
                        {customer.points.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div style={{
          width: '60%',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          {/* FIXED: Close Button - Now just closes this popup */}
          <button 
            onClick={handleCloseButtonClick}
            style={{
              background: '#003049',
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
              right: '16px',
            }}
            title="Close"
          >
            <FaTimes color="white" size={20} />
          </button>

          <div style={{ marginBottom: '20px' }}>
            <h1 style={{ marginBottom: '5px', fontSize: '22px' }}>Customers</h1>
            <p style={{ color: '#999', margin: '0', fontSize: '13px' }}>*Become a loyalty customer to access exclusive benefits*</p>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
            <div style={{ 
              display: 'flex', 
              flex: 1, 
              border: '1px solid #CCC', 
              borderRadius: '8px',
              padding: '6px 12px',
              alignItems: 'center'
            }}>
              <input 
                type="text" 
                placeholder="Search by phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  fontSize: '14px'
                }}
              />
              <FaSearch color="#999" size={14} />
            </div>
            <button 
              onClick={() => setShowAddCustomerPopup(true)}
              style={{
                backgroundColor: '#1C1C1E',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '13px'
              }}
            >
              <FaPlus size={12} />
              Add New Customer
            </button>
          </div>
          
          <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Customer Details</h2>
          
          <div style={{ 
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '12px' }}>Title</label>
              <select
                value={customerData.title}
                onChange={(e) => setCustomerData({...customerData, title: e.target.value as 'MR' | 'MRS' | 'OTHER'})}
                disabled={!fieldsEditable}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: '1px solid #CCC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box',
                  backgroundColor: fieldsEditable ? 'white' : '#f0f0f0',
                  cursor: fieldsEditable ? 'pointer' : 'not-allowed'
                }}
              >
                <option value="MR">Mr.</option>
                <option value="MRS">Mrs.</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '12px' }}>Name</label>
              <input 
                type="text" 
                value={customerData.name || ''}
                onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                disabled={!fieldsEditable}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: '1px solid #CCC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box',
                  backgroundColor: fieldsEditable ? 'white' : '#f0f0f0',
                  cursor: fieldsEditable ? 'text' : 'not-allowed'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '12px' }}>E-mail</label>
              <input 
                type="email" 
                value={customerData.email || ''}
                onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                disabled={!fieldsEditable}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: '1px solid #CCC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box',
                  backgroundColor: fieldsEditable ? 'white' : '#f0f0f0',
                  cursor: fieldsEditable ? 'text' : 'not-allowed'
                }}
              />
            </div>
            
            <div style={{ marginBottom: error ? '15px' : '0' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '12px' }}>Phone</label>
              <input 
                type="tel" 
                value={customerData.phone || ''}
                onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                disabled={!fieldsEditable}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: '1px solid #CCC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box',
                  backgroundColor: fieldsEditable ? 'white' : '#f0f0f0',
                  cursor: fieldsEditable ? 'text' : 'not-allowed'
                }}
              />
            </div>
            
            {error && (
              <div style={{ color: '#FF3B30', fontSize: '12px', marginTop: '5px' }}>
                {error}
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => {
                if (customerData.phone) {
                  setShowDetailsPopup(true);
                }
              }}
              disabled={!customerData.phone}
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
                opacity: customerData.phone ? 1 : 0.5
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {showDetailsPopup && (
        <div className="popup-portal">
          <CustomerDetails 
            customerId={customerData.phone || ''}
            onClose={handleCloseDetailsPopup}
            onCustomerDeleted={handleCustomerDeleted}
            onPhoneUpdated={handlePhoneUpdated}
          />
        </div>
      )}
      
      {showAddCustomerPopup && (
        <div className="popup-portal">
          <CustomerAdd 
            onClose={() => setShowAddCustomerPopup(false)} 
            onCustomerAdded={handleAddCustomerSuccess}
          />
        </div>
      )}
    </div>,
    document.body
  );
};

export default CustomerOrders;