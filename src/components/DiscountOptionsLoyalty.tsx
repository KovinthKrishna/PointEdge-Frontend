import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTrash, FaCog, FaUsers, FaArrowLeft, FaPlus, FaSearch, FaCrown, FaMedal, FaAward, FaStar, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';
import shopping from '../assets/shopping.png';

interface DiscountOptionsLoyaltyProps {
  onSettingsClick: () => void;
  onDeleteClick: () => void;
}

interface CustomerData {
  id: string;
  customerId: string;
  phone: string;
  amount: number;
  discount: number;
  date: string;
  tier?: 'gold' | 'silver' | 'bronze';
}

interface OrderData {
  id: string | number;
  date: string;
  items: string | number;
  amount: number;
  points: number;
}

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById('modal-root');
    if (!element) {
      element = document.createElement('div');
      element.id = 'modal-root';
      document.body.appendChild(element);
    }
    setModalRoot(element);

    return () => {
      if (element && element.childNodes.length === 0) {
        document.body.removeChild(element);
      }
    };
  }, []);

  if (!modalRoot) return null;
  return ReactDOM.createPortal(children, modalRoot);
};

const AddCustomerPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [customerData, setCustomerData] = useState({
    title: 'Mr.',
    name: '',
    email: '',
    phone: ''
  });

  return (
    <ModalPortal>
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
            <img src={shopping} alt="Point Edge Logo" style={{ width: '598x', height: '417px', paddingBottom:'30px' }} /> 
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
                <div style={{
                  border: '1px solid #CCC',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '34px',
                  fontSize: '14px'
                }}>
                  <span>{customerData.title}</span>
                  <span>▼</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Name</div>
                <input 
                  type="text" 
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    border: '1px solid #CCC',
                    borderRadius: '6px',
                    fontSize: '14px',
                    height: '34px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>E-mail</div>
                <input 
                  type="email" 
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    border: '1px solid #CCC',
                    borderRadius: '6px',
                    fontSize: '14px',
                    height: '34px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>Phone</div>
                <input 
                  type="tel" 
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    border: '1px solid #CCC',
                    borderRadius: '6px',
                    fontSize: '14px',
                    height: '34px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={onClose}
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
              >
                Cancel
              </button>
              
              <button 
                onClick={() => {
                  // Handle add customer logic here
                  onClose();
                }}
                style={{
                  backgroundColor: '#1C1C1E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 15px',
                  cursor: 'pointer',
                  flex: 1,
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

const CustomerDetailsPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [customerData, setCustomerData] = useState({
    name: 'Anura Kumara',
    email: 'example@gmail.com',
    phone: '0710000000',
  });

  const orders: OrderData[] = [
    { id: 240, date: '2024-11-28 17:11PM', items: 4, amount: 4556.00, points: 27.14 },
    { id: 241, date: '2024-11-28 17:11PM', items: 6, amount: 7321.00, points: 45.01 },
    { id: 242, date: '2024-11-28 17:11PM', items: 2, amount: 3127.00, points: 21.01 },
    { id: 243, date: '2024-11-28 17:11PM', items: 3, amount: 10000.00, points: 56.93 },
    { id: 244, date: '2024-11-28 17:11PM', items: 2, amount: 732.00, points: 5.11 },
  ];

  return (
    <ModalPortal>
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
            
            <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '20px' }}>
              <div style={{ 
                backgroundColor: '#00253A',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px' }}>
                  <FaCrown color="#D4AF37" size={16} style={{ marginRight: '8px' }} />
                  <h3 style={{ 
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#D4AF37'
                  }}>
                    GOLD MEMBER
                  </h3>
                </div>
                <div style={{ 
                  fontSize: '12px',
                  color: '#fff',
                  marginBottom: '10px'
                }}>
                  Customer ID #2231
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
                  14053.23
                  <FaStar color="#4CD964" size={16} style={{ marginLeft: '8px' }} />
                </div>
                <div style={{ 
                  fontSize: '14px',
                  color: '#fff'
                }}>
                  Loyalty Points
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>Order History</div>
            
            <div style={{ flex: 1, overflow: 'auto' }}>
              {orders.map((order) => (
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
              ))}
            </div>
          </div>
          
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
                <div style={{
                  border: '1px solid #CCC',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '34px',
                  fontSize: '14px'
                }}>
                  <span>Mr.</span>
                  <span>▼</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>Name</label>
                <input 
                  type="text" 
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    border: '1px solid #CCC',
                    borderRadius: '6px',
                    fontSize: '14px',
                    height: '34px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>E-mail</label>
                <input 
                  type="email" 
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    border: '1px solid #CCC',
                    borderRadius: '6px',
                    fontSize: '14px',
                    height: '34px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>Phone</label>
                <input 
                  type="tel" 
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    border: '1px solid #CCC',
                    borderRadius: '6px',
                    fontSize: '14px',
                    height: '34px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{
                backgroundColor: 'transparent',
                color: '#FF3B30',
                border: '1px solid #FF3B30',
                borderRadius: '6px',
                padding: '10px 15px',
                cursor: 'pointer',
                flex: 1,
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Delete Customer
              </button>
              
              <button style={{
                backgroundColor: '#1C1C1E',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 15px',
                cursor: 'pointer',
                flex: 1,
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

const CustomersPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customerData, setCustomerData] = useState({
    title: 'Mr.',
    name: 'Anura Kumara',
    email: 'example@gmail.com',
    phone: '0710000000'
  });
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showAddCustomerPopup, setShowAddCustomerPopup] = useState(false);
  
  const customers: CustomerData[] = [
    { id: '#243', customerId: '0701123558', phone: '0701123558', amount: 45656.00, discount: 21237.14, date: '2024-11-28 17:11PM', tier: 'gold' },
    { id: '#98', customerId: '0710000000', phone: '0710000000', amount: 7321.00, discount: 2546.01, date: '2024-11-28 17:11PM' },
    { id: '#263', customerId: '0775649456', phone: '0775649456', amount: 31257.00, discount: 5647.01, date: '2024-11-28 17:11PM', tier: 'bronze' },
    { id: '#113', customerId: '0751234567', phone: '0751234567', amount: 100050.00, discount: 12356.98, date: '2024-11-28 17:11PM', tier: 'silver' },
    { id: '#29', customerId: '0789988776', phone: '0789988776', amount: 732.00, discount: 5.11, date: '2024-11-28 17:11PM' },
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const getTierIcon = (tier?: string) => {
    if (tier === 'gold') return <FaCrown color="#FFD700" size={16} />;
    if (tier === 'silver') return <FaMedal color="#C0C0C0" size={16} />;
    if (tier === 'bronze') return <FaAward color="#CD7F32" size={16} />;
    return null;
  };

  return (
    <ModalPortal>
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
            
            <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '20px' }}>
              <div style={{ margin: '0 auto', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FaUsers color="white" size={42} />
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <span style={{ color: '#FF3B30', fontWeight: 'bold', fontSize: '24px' }}>567</span>
              <span style={{ fontSize: '24px', marginLeft: '10px' }}>Loyalty Customers</span>
            </div>
            
            <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>Customers</div>
            
            <div style={{ flex: 1, overflow: 'auto' }}>
              {customers.map((customer) => (
                <div key={customer.id} style={{
                  backgroundColor: '#00253A',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '10px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontSize: '12px', color: '#CCC' }}>Customer ID {customer.id}</div>
                    <div style={{ fontSize: '12px', color: '#CCC' }}>{customer.date}</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>{customer.phone}</div>
                      {customer.tier && <div style={{ marginLeft: '8px' }}>{getTierIcon(customer.tier)}</div>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <div>Rs {customer.amount.toFixed(2)}</div>
                      <div style={{ 
                        backgroundColor: '#4CD964', 
                        color: 'white', 
                        padding: '2px 12px', 
                        borderRadius: '12px',
                        fontSize: '12px' 
                      }}>
                        {customer.discount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{
            width: '60%',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
          }}>
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
                  placeholder="0710000000"
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
            
            <h2 style={{ fontSize: '16px', marginBottom: '16px' }}>Your personal data</h2>
            
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>Title</label>
              <div style={{
                border: '1px solid #CCC',
                borderRadius: '6px',
                padding: '6px 10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '34px',
                fontSize: '14px'
              }}>
                <span>Mr.</span>
                <span>▼</span>
              </div>
            </div>
            
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>Name</label>
              <input 
                type="text" 
                value={customerData.name}
                onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: '1px solid #CCC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>E-mail</label>
              <input 
                type="email" 
                value={customerData.email}
                onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: '1px solid #CCC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#666', fontSize: '13px' }}>Phone</label>
              <input 
                type="tel" 
                value={customerData.phone}
                onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  border: '1px solid #CCC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  height: '34px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            <div>
              <button 
                onClick={() => setShowDetailsPopup(true)}
                style={{
                  backgroundColor: '#1C1C1E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDetailsPopup && <CustomerDetailsPopup onClose={() => setShowDetailsPopup(false)} />}
      {showAddCustomerPopup && <AddCustomerPopup onClose={() => setShowAddCustomerPopup(false)} />}
    </ModalPortal>
  );
};

const DiscountOptionsLoyalty: React.FC<DiscountOptionsLoyaltyProps> = ({ 
  onSettingsClick,
  onDeleteClick,
}) => {
  const [showCustomers, setShowCustomers] = useState(false);

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
              fontSize: '0.8em',
              fontWeight: 'normal'
            }}>5</span>
          </h1>
          <h2 style={{
            margin: '0',
            fontSize: 'clamp(14px, 3vw, 16px)',
            fontWeight: 'normal',
            color: '#666',
            lineHeight: '1.2'
          }}>
            Bond Sales with Smart Discounts
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
            onClick={onDeleteClick}
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
            onClick={() => setShowCustomers(true)}
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
      
      {showCustomers && <CustomersPopup onClose={() => setShowCustomers(false)} />}
    </div>
  );
};

export default DiscountOptionsLoyalty;