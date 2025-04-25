import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';
import { 
  fetchItemDiscounts, 
  fetchDiscountCount,
  deleteDiscount,
  fetchProductNames,
  fetchCategoryNames
} from '../../services/discountService';
import Discount from '../../models/Discount';

interface DiscountNameMap {
  [key: number]: string;
}

interface DiscountTableItemProps {
  onEditDiscount: (id: number) => void;
}

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

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

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  return ReactDOM.createPortal(children, modalRoot);
};

const DiscountTableItem: React.FC<DiscountTableItemProps> = ({ onEditDiscount }) => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [productNames, setProductNames] = useState<DiscountNameMap>({});
  const [categoryNames, setCategoryNames] = useState<DiscountNameMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [discountCount, setDiscountCount] = useState<number>(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [discountToDelete, setDiscountToDelete] = useState<number | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
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

  // Table column widths
  const columnWidths = {
    name: '15%',
    type: '18%',
    startDate: '15%',
    duration: '10%',
    remaining: '12%',
    status: '10%',
    discount: '10%',
    actions: '10%'
  };

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

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [discountData, countData, products, categories] = await Promise.all([
          fetchItemDiscounts(),
          fetchDiscountCount(),
          fetchProductNames(),
          fetchCategoryNames()
        ]);

        const productNameMap: DiscountNameMap = {};
        products.forEach((product: any) => {
          productNameMap[product.id] = product.name;
        });

        const categoryNameMap: DiscountNameMap = {};
        categories.forEach((category: any) => {
          categoryNameMap[category.id] = category.name;
        });

        setDiscounts(discountData);
        setProductNames(productNameMap);
        setCategoryNames(categoryNameMap);
        setDiscountCount(countData.count);
        setLoading(false);
      } catch (error) {
        console.error('Error loading item discount data:', error);
        setError('Failed to load item discounts. Please try again later.');
        setLoading(false);
      }
    };

    loadData();

    const intervalId = setInterval(() => {
      setDiscounts(prev => [...prev]); // Force re-render to update remaining times
    }, 1000); // Update every second for live countdown

    return () => clearInterval(intervalId);
  }, []);

  // Helper functions for status display
  const getStatusDot = (status: boolean) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: status ? '#10B981' : '#EF4444',
    display: 'inline-block',
    marginRight: '6px',
  });

  const getStatusStyle = (status: boolean) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '20px',
    backgroundColor: status ? '#ECFDF5' : '#FEF2F2',
    color: status ? '#10B981' : '#EF4444',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  });

  const formatDiscountValue = (discount: Discount) => {
    if (discount.percentage) {
      return `${discount.percentage}%`;
    } else if (discount.amount) {
      return `Rs ${discount.amount.toFixed(2)}`;
    }
    return '-';
  };

  const formatDate = (dateString: string | undefined | Date | null) => {
    if (!dateString) return '-';
    try {
      const date = dateString instanceof Date ? dateString : new Date(dateString);
      // Add 5 hours and 30 minutes to convert UTC to Sri Lankan time
      const sriLankanDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
      return format(sriLankanDate, "yyyy-MM-dd HH:mm");
    } catch (e) {
      return typeof dateString === 'string' ? dateString : '-';
    }
  };

  const getRemainingTimeStyle = (remainingTime: string) => {
    if (remainingTime === 'Expired') {
      return { color: '#EF4444', fontWeight: 'bold' };
    }
    
    // Check if remaining time is less than 60 minutes
    const timeParts = remainingTime.split(' ');
    const days = parseInt(timeParts[0]) || 0;
    const hours = parseInt(timeParts[1]) || 0;
    const minutes = parseInt(timeParts[2]) || 0;
    
    const totalMinutes = (days * 24 * 60) + (hours * 60) + minutes;
    
    if (totalMinutes < 60) {
      return { color: '#F59E0B', fontWeight: 'bold' }; // Orange for less than 60 minutes
    }
    
    return { color: '#3B82F6' }; // Blue for normal
  };

  const getRemainingTime = (startDate: string | undefined, duration: string) => {
    if (!startDate) return '-';
    
    try {
      // Parse the start date in UTC
      const start = new Date(startDate);
      
      // Parse duration (e.g., "8 Hours")
      const durationMatch = duration.match(/(\d+)\s*(hour|day|minute|second|week|month|year)s?/i);
      
      if (!durationMatch) return '-';
      
      const value = parseInt(durationMatch[1]);
      const unit = durationMatch[2].toLowerCase();
      
      // Calculate end date in UTC
      const endDate = new Date(start);
      
      switch (unit) {
        case 'hour':
          endDate.setHours(endDate.getHours() + value);
          break;
        case 'day':
          endDate.setDate(endDate.getDate() + value);
          break;
        case 'week':
          endDate.setDate(endDate.getDate() + (value * 7));
          break;
        case 'month':
          endDate.setMonth(endDate.getMonth() + value);
          break;
        case 'year':
          endDate.setFullYear(endDate.getFullYear() + value);
          break;
        case 'minute':
          endDate.setMinutes(endDate.getMinutes() + value);
          break;
        case 'second':
          endDate.setSeconds(endDate.getSeconds() + value);
          break;
      }
      
      // Add 5 hours and 30 minutes to the end date for Sri Lankan time
      endDate.setHours(endDate.getHours() + 5);
      endDate.setMinutes(endDate.getMinutes() + 30);
      
      // Get current time in UTC
      const now = new Date();
      
      if (endDate <= now) return 'Expired';
      
      // Calculate differences in milliseconds
      const diff = endDate.getTime() - now.getTime();
      
      // Convert to days, hours, minutes, seconds
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } catch (e) {
      console.error('Error calculating remaining time:', e);
      return '-';
    }
  };

  const getFormattedType = (discount: Discount) => {
    if (discount.type === 'ITEM') {
      if (discount.itemId === undefined || discount.itemId === null) {
        return 'Item Discount';
      }
      const itemName = productNames[discount.itemId];
      return itemName ? `Item - ${itemName}` : `Item - ID: ${discount.itemId}`;
    }
    return 'Item Discount';
  };

  const displayStatus = (isActive: boolean) => {
    return (
      <div style={getStatusStyle(isActive)}>
        <span style={getStatusDot(isActive)}></span>
        {isActive ? 'Active' : 'Inactive'}
      </div>
    );
  };

  // Delete confirmation handlers
  const handleDeleteClick = (discountId: number | undefined) => {
    if (!discountId) return;
    setDiscountToDelete(discountId);
    setDeleteError(null);
    setShowDeleteConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowDeleteConfirmation(false);
    setDiscountToDelete(undefined);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!discountToDelete) return;
    
    try {
      setIsDeleting(true);
      setDeleteError(null);
      
      const result = await deleteDiscount(discountToDelete);
      
      if (result.success) {
        setDiscounts(prev => prev.filter(d => d.id !== discountToDelete));
        setDiscountCount(prev => prev - 1);
        setShowDeleteConfirmation(false);
        setDiscountToDelete(undefined);
        showNotification('Item discount deleted successfully', 'success');
      } else {
        const errorMsg = result.message || 'Failed to delete item discount. Please try again.';
        setDeleteError(errorMsg);
        showNotification(errorMsg, 'error');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to delete item discount. Please try again.';
      setDeleteError(errorMsg);
      showNotification(errorMsg, 'error');
    } finally {
      setIsDeleting(false);
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

  // Table container styles
  const tableContainerStyle: React.CSSProperties = {
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    background: 'white',
    overflow: 'hidden',
    border: '1px solid #EAECF0',
    marginBottom: '24px'
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        color: '#6B7280',
        fontSize: '15px'
      }}>
        Loading item discounts...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        color: '#dc3545',
        backgroundColor: '#fff1f0',
        borderLeft: '4px solid #dc3545',
        borderRadius: '4px',
        padding: '0 20px',
        margin: '20px auto',
        maxWidth: '600px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        gap: '8px'
      }}>
        <div style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          backgroundColor: '#dc3545',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          flexShrink: 0
        }}>!</div>
        {error}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={tableContainerStyle}>
        <div style={{ overflowX: 'auto' }}>
          {discounts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#6B7280',
              fontSize: '15px'
            }}>
              No item discounts found.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: '800px' }}>
              <thead>
                <tr style={{ 
                  background: '#F9FAFB', 
                  textAlign: 'left',
                  borderBottom: '1px solid #EAECF0'
                }}>
                  <th style={{ 
                    padding: '14px 16px', 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    width: columnWidths.name,
                    whiteSpace: 'nowrap'
                  }}>Name</th>
                  <th style={{ 
                    padding: '14px 16px', 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    width: columnWidths.type,
                    whiteSpace: 'nowrap'
                  }}>Item</th>
                  <th style={{ 
                    padding: '14px 16px', 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    width: columnWidths.startDate,
                    whiteSpace: 'nowrap'
                  }}>Start Date & Time</th>
                  <th style={{ 
                    padding: '14px 16px', 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    width: columnWidths.duration,
                    whiteSpace: 'nowrap'
                  }}>Duration</th>
                  <th style={{ 
                    padding: '14px 16px', 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    width: columnWidths.remaining,
                    whiteSpace: 'nowrap'
                  }}>Time Left</th>
                  <th style={{ 
                    padding: '14px 16px', 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    width: columnWidths.status,
                    whiteSpace: 'nowrap'
                  }}>Status</th>
                  <th style={{ 
                    padding: '14px 16px', 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    width: columnWidths.discount,
                    whiteSpace: 'nowrap'
                  }}>Discount</th>
                  <th style={{ 
                    padding: '14px 16px', 
                    fontSize: '14px', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    width: columnWidths.actions,
                    whiteSpace: 'nowrap'
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount, index) => {
                  const remainingTime = getRemainingTime(discount.startDate, discount.duration);
                  const remainingStyle = getRemainingTimeStyle(remainingTime);
                  
                  return (
                    <tr 
                      key={discount.id} 
                      style={{ 
                        borderBottom: '1px solid #EAECF0',
                        backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB'
                      }}
                    >
                      <td style={{ 
                        padding: '14px 16px', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#111827',
                        width: columnWidths.name,
                        maxWidth: '0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {discount.name}
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        fontSize: '14px', 
                        color: '#374151',
                        width: columnWidths.type,
                        maxWidth: '0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {getFormattedType(discount)}
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        fontSize: '14px', 
                        color: '#374151',
                        width: columnWidths.startDate,
                        whiteSpace: 'nowrap'
                      }}>
                        {formatDate(discount.startDate)}
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        fontSize: '14px', 
                        color: '#374151',
                        width: columnWidths.duration,
                        whiteSpace: 'nowrap'
                      }}>
                        {discount.duration}
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        fontSize: '14px', 
                        ...remainingStyle,
                        width: columnWidths.remaining,
                        whiteSpace: 'nowrap'
                      }}>
                        {remainingTime}
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        fontSize: '14px', 
                        width: columnWidths.status
                      }}>
                        {displayStatus(discount.isActive)}
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        fontSize: '14px', 
                        fontWeight: '500',
                        width: columnWidths.discount,
                        whiteSpace: 'nowrap'
                      }}>
                        {formatDiscountValue(discount)}
                      </td>
                      <td style={{ 
                        padding: '14px 16px', 
                        fontSize: '14px',
                        width: columnWidths.actions
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          gap: '16px', 
                          alignItems: 'center'
                        }}>
                          <button
                            onClick={() => discount.id !== undefined && onEditDiscount(discount.id)}
                            title="Edit Discount"
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: '6px',
                              cursor: 'pointer',
                              color: '#3B82F6',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(discount.id)}
                            title="Delete Discount"
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: '6px',
                              cursor: 'pointer',
                              color: '#EF4444',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'background-color 0.2s',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showDeleteConfirmation && (
        <ModalPortal>
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
                Are you sure you want to delete this item discount? This action cannot be undone.
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
        </ModalPortal>
      )}

      {/* Notification Component */}
      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
};

export default DiscountTableItem;