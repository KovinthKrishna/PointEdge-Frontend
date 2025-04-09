import React, { useState } from 'react';
import { FaArrowLeft, FaSearch, FaChevronDown, FaCircle } from 'react-icons/fa';

interface DiscountAddProps {
  onBack: () => void;
}

const DiscountAdd: React.FC<DiscountAddProps> = ({ onBack }) => {
  const [discountType, setDiscountType] = useState('item');
  const [enableDiscount, setEnableDiscount] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    discountName: false,
    item: false,
    category: false,
    amount: false,
    percentage: false,
    tier: false,
    duration: false
  });

  const toggleDropdown = (dropdown: keyof typeof dropdownOpen) => {
    setDropdownOpen(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  return (
    <div style={{ padding: '16px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Create New Discount</h1>
        
        {/* Updated buttons to match first code style */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={onBack}
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
            <FaArrowLeft style={{ marginRight: '8px', fontSize: '14px', color: '#666' }} />
            Back to Discounts
          </button>
          <button 
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
            Save Discount
          </button>
        </div>
      </div>
      
      <div style={{ 
        background: '#fff', 
        border: '1px solid #eee', 
        borderRadius: '4px', 
        padding: '16px'
      }}>
        {/* Discount Type with Enable Toggle */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '16px' 
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Discount Type</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setDiscountType('item')}
                style={{
                  padding: '6px 10px',
                  background: discountType === 'item' ? '#008ED8' : '#f5f5f5',
                  color: discountType === 'item' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Item Discount
              </button>
              <button 
                onClick={() => setDiscountType('category')}
                style={{
                  padding: '6px 10px',
                  background: discountType === 'category' ? '#008ED8' : '#f5f5f5',
                  color: discountType === 'category' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Category Discount
              </button>
              <button 
                onClick={() => setDiscountType('loyalty')}
                style={{
                  padding: '6px 10px',
                  background: discountType === 'loyalty' ? '#008ED8' : '#f5f5f5',
                  color: discountType === 'loyalty' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Loyalty Discount
              </button>
            </div>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginLeft: '16px',
            marginTop: '28px' 
          }}>
            <div 
              onClick={() => setEnableDiscount(!enableDiscount)}
              style={{
                width: '36px',
                height: '18px',
                background: enableDiscount ? '#008ED8' : '#ccc',
                borderRadius: '9px',
                position: 'relative',
                cursor: 'pointer',
                marginRight: '8px'
              }}
            >
              <div style={{
                width: '14px',
                height: '14px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: enableDiscount ? '20px' : '2px',
                transition: 'left 0.2s'
              }} />
            </div>
            {enableDiscount && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaCircle style={{ color: '#4CAF50', fontSize: '9px', marginRight: '4px' }} />
                <span style={{ fontSize: '13px' }}>Active</span>
              </div>
            )}
            {!enableDiscount && <span style={{ fontSize: '13px' }}>Disabled</span>}
          </div>
        </div>

        {/* Two column layout for form fields */}
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -8px' }}>
          {/* Left Column */}
          <div style={{ flex: '1 1 50%', minWidth: '280px', padding: '0 8px' }}>
            {/* Discount Name Dropdown */}
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Discount Name</h3>
              <div 
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px'
                }}
                onClick={() => toggleDropdown('discountName')}
              >
                <span>Select discount name</span>
                <FaChevronDown style={{ fontSize: '11px' }} />
              </div>
              {dropdownOpen.discountName && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: 'white',
                  zIndex: 100,
                  padding: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <FaSearch style={{
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#999',
                      fontSize: '11px'
                    }} />
                    <input 
                      type="text" 
                      placeholder="Search discount names..."
                      style={{
                        width: '100%',
                        padding: '6px 6px 6px 26px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                  <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    <div style={{ padding: '6px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '13px' }}>Black Friday</div>
                    <div style={{ padding: '6px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '13px' }}>Weekly</div>
                    <div style={{ padding: '6px', cursor: 'pointer', fontSize: '13px' }}>+ Add New</div>
                  </div>
                </div>
              )}
            </div>

            {/* Item Search Dropdown (shown for Item Discount) */}
            {discountType === 'item' && (
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Select Item</h3>
                <div 
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '6px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '13px'
                  }}
                  onClick={() => toggleDropdown('item')}
                >
                  <span>Select items</span>
                  <FaChevronDown style={{ fontSize: '11px' }} />
                </div>
                {dropdownOpen.item && (
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: 'white',
                    zIndex: 100,
                    padding: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                      <FaSearch style={{
                        position: 'absolute',
                        left: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#999',
                        fontSize: '11px'
                      }} />
                      <input 
                        type="text" 
                        placeholder="Search items..."
                        style={{
                          width: '100%',
                          padding: '6px 6px 6px 26px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '13px'
                        }}
                      />
                    </div>
                    <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                      <div style={{ padding: '6px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '13px' }}>Item 1</div>
                      <div style={{ padding: '6px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '13px' }}>Item 2</div>
                      <div style={{ padding: '6px', cursor: 'pointer', fontSize: '13px' }}>+ Add New</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Category Search Dropdown (shown for Category Discount) */}
            {discountType === 'category' && (
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Select Category</h3>
                <div 
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '6px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '13px'
                  }}
                  onClick={() => toggleDropdown('category')}
                >
                  <span>Select categories</span>
                  <FaChevronDown style={{ fontSize: '11px' }} />
                </div>
                {dropdownOpen.category && (
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: 'white',
                    zIndex: 100,
                    padding: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ position: 'relative', marginBottom: '8px' }}>
                      <FaSearch style={{
                        position: 'absolute',
                        left: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#999',
                        fontSize: '11px'
                      }} />
                      <input 
                        type="text" 
                        placeholder="Search categories..."
                        style={{
                          width: '100%',
                          padding: '6px 6px 6px 26px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '13px'
                        }}
                      />
                    </div>
                    <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                      <div style={{ padding: '6px', cursor: 'pointer', fontSize: '13px' }}>+ Add New</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tier Search Dropdown - Now in left column */}
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Select Tier</h3>
              <div 
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px'
                }}
                onClick={() => toggleDropdown('tier')}
              >
                <span>Select tiers</span>
                <FaChevronDown style={{ fontSize: '11px' }} />
              </div>
              {dropdownOpen.tier && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: 'white',
                  zIndex: 100,
                  padding: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <FaSearch style={{
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#999',
                      fontSize: '11px'
                    }} />
                    <input 
                      type="text" 
                      placeholder="Search tiers..."
                      style={{
                        width: '100%',
                        padding: '6px 6px 6px 26px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                  <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    <div style={{ padding: '6px', cursor: 'pointer', fontSize: '13px' }}>+ Add New</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div style={{ flex: '1 1 50%', minWidth: '280px', padding: '0 8px' }}>
            {/* Percentage Dropdown */}
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Percentage</h3>
              <div 
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px'
                }}
                onClick={() => toggleDropdown('percentage')}
              >
                <span>Select percentages</span>
                <FaChevronDown style={{ fontSize: '11px' }} />
              </div>
              {dropdownOpen.percentage && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: 'white',
                  zIndex: 100,
                  padding: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <FaSearch style={{
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#999',
                      fontSize: '11px'
                    }} />
                    <input 
                      type="text" 
                      placeholder="Search percentages..."
                      style={{
                        width: '100%',
                        padding: '6px 6px 6px 26px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                  <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    <div style={{ padding: '6px', cursor: 'pointer', fontSize: '13px' }}>+ Add New</div>
                  </div>
                </div>
              )}
            </div>

            {/* Amount Search Dropdown - Now in right column */}
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Amount</h3>
              <div 
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px'
                }}
                onClick={() => toggleDropdown('amount')}
              >
                <span>Select amounts</span>
                <FaChevronDown style={{ fontSize: '11px' }} />
              </div>
              {dropdownOpen.amount && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: 'white',
                  zIndex: 100,
                  padding: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <FaSearch style={{
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#999',
                      fontSize: '11px'
                    }} />
                    <input 
                      type="text" 
                      placeholder="Search amounts..."
                      style={{
                        width: '100%',
                        padding: '6px 6px 6px 26px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                  <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    <div style={{ padding: '6px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '13px' }}>Rs 100.00</div>
                    <div style={{ padding: '6px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '13px' }}>Rs 200.00</div>
                    <div style={{ padding: '6px', cursor: 'pointer', fontSize: '13px' }}>+ Add New</div>
                  </div>
                </div>
              )}
            </div>

            {/* Duration Dropdown */}
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Duration</h3>
              <div 
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px'
                }}
                onClick={() => toggleDropdown('duration')}
              >
                <span>Select durations</span>
                <FaChevronDown style={{ fontSize: '11px' }} />
              </div>
              {dropdownOpen.duration && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: 'white',
                  zIndex: 100,
                  padding: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <FaSearch style={{
                      position: 'absolute',
                      left: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#999',
                      fontSize: '11px'
                    }} />
                    <input 
                      type="text" 
                      placeholder="Search durations..."
                      style={{
                        width: '100%',
                        padding: '6px 6px 6px 26px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                  <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                    <div style={{ padding: '6px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '13px' }}>1 Hour</div>
                    <div style={{ padding: '6px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: '13px' }}>2 Hour</div>
                    <div style={{ padding: '6px', cursor: 'pointer', fontSize: '13px' }}>+ Add New</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountAdd;