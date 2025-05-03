import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';
import { 
  fetchLoyaltyDiscounts, 
  fetchDiscountCount,
  deleteDiscount
} from '../../services/discountService';
import Discount from '../../models/Discount';
import './styles/DiscountTable.css';

interface DiscountTableLoyaltyProps {
  onEditDiscount: (id: number) => void;
}

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

// Modal Portal component - added from DiscountTableDashboard
const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  return ReactDOM.createPortal(children, modalRoot);
};

// Notification Component - updated class names
const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div className={`discount-notification discount-notification--${type}`}>
      {type === 'success' ? 
        <FaCheck className="discount-notification__icon" /> : 
        <FaTimes className="discount-notification__icon" />
      }
      {message}
    </div>
  );
};

const DiscountTableLoyalty: React.FC<DiscountTableLoyaltyProps> = ({ onEditDiscount }) => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [, setDiscountCount] = useState<number>(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [discountToDelete, setDiscountToDelete] = useState<number | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  // Added modal-root creation - same as in DiscountTableDashboard
  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      const newModalRoot = document.createElement('div');
      newModalRoot.id = 'modal-root';
      document.body.appendChild(newModalRoot);
    }
    
    return () => {
      const modalRoot = document.getElementById('modal-root');
      if (modalRoot && modalRoot.parentNode) {
        modalRoot.parentNode.removeChild(modalRoot);
      }
    };
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [discountData, countData] = await Promise.all([
        fetchLoyaltyDiscounts(),
        fetchDiscountCount()
      ]);

      setDiscounts(discountData || []); // Ensure we handle null/undefined data
      setDiscountCount(countData?.count || 0);
    } catch (error) {
      console.error('Error loading loyalty discount data:', error);
      setError('Failed to load loyalty discounts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const intervalId = setInterval(() => {
      setDiscounts(prev => [...prev]); // Force re-render to update remaining times
    }, 1000); // Update every second for live countdown

    return () => clearInterval(intervalId);
  }, []);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Helper functions for status display - updated class names
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

  const getRemainingTimeClass = (remainingTime: string) => {
    if (remainingTime === 'Expired') {
      return 'discount-time-remaining--expired';
    }
    
    // Check if remaining time is less than (60 minutes)
    const timeParts = remainingTime.split(' ');
    const days = parseInt(timeParts[0]) || 0;
    const hours = parseInt(timeParts[1]) || 0;
    const minutes = parseInt(timeParts[2]) || 0;
    
    const totalMinutes = (days * 24 * 60) + (hours * 60) + minutes;
    
    if (totalMinutes < 60) {
      return 'discount-time-remaining--warning'; // Orange for less than 60 minutes
    }
    
    return 'discount-time-remaining--normal'; // Blue for normal
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
    if (discount.type === 'LOYALTY') {
      if (discount.loyaltyType) {
        return `Loyalty - ${discount.loyaltyType}`;
      }
      return 'Loyalty Discount';
    }
    return 'Loyalty Discount';
  };

  // Updated to use the same class names as DiscountTableDashboard
  const displayStatus = (isActive: boolean) => {
    return (
      <div className={`discount-status ${isActive ? 'discount-status--active' : 'discount-status--inactive'}`}>
        <span className={`discount-status__dot ${isActive ? 'discount-status__dot--active' : 'discount-status__dot--inactive'}`}></span>
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
        // Check if this was the last discount
        const isLastDiscount = discounts.length === 1;
        
        if (isLastDiscount) {
          // If this was the last discount, reload the data completely
          await loadData();
        } else {
          // Otherwise just update the state directly
          setDiscounts(prev => prev.filter(d => d.id !== discountToDelete));
          setDiscountCount(prev => Math.max(0, prev - 1));
        }
        
        setShowDeleteConfirmation(false);
        setDiscountToDelete(undefined);
        showNotification('Loyalty discount deleted successfully', 'success');
      } else {
        const errorMsg = result.message || 'Failed to delete loyalty discount. Please try again.';
        setDeleteError(errorMsg);
        showNotification(errorMsg, 'error');
      }
    } catch (error) {
      console.error('Error during deletion process:', error);
      const errorMsg = error instanceof Error ? error.message : 'Failed to delete loyalty discount. Please try again.';
      setDeleteError(errorMsg);
      showNotification(errorMsg, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="discount-loading">
        Loading loyalty discounts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="discount-error">
        <div className="discount-error__icon">!</div>
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="discount-table-container">
        <div style={{ overflowX: 'auto' }}>
          {discounts.length === 0 ? (
            <div className="discount-empty-state">
              No loyalty discounts found.
            </div>
          ) : (
            <table className="discount-table">
              <thead>
                <tr className="discount-table__header">
                  <th className="discount-table__header-cell col-name">Name</th>
                  <th className="discount-table__header-cell col-type">Loyalty Tier</th>
                  <th className="discount-table__header-cell col-start-date">Start Date & Time</th>
                  <th className="discount-table__header-cell col-duration">Duration</th>
                  <th className="discount-table__header-cell col-remaining">Time Left</th>
                  <th className="discount-table__header-cell col-status">Status</th>
                  <th className="discount-table__header-cell col-discount">Discount</th>
                  <th className="discount-table__header-cell col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount, index) => {
                  const remainingTime = getRemainingTime(discount.startDate, discount.duration);
                  const remainingClass = getRemainingTimeClass(remainingTime);
                  
                  return (
                    <tr 
                      key={discount.id} 
                      className={`discount-table__row ${index % 2 === 0 ? 'discount-table__row--even' : 'discount-table__row--odd'}`}
                    >
                      <td className="discount-table__cell discount-table__cell--name">
                        {discount.name}
                      </td>
                      <td className="discount-table__cell">
                        {getFormattedType(discount)}
                      </td>
                      <td className="discount-table__cell">
                        {formatDate(discount.startDate)}
                      </td>
                      <td className="discount-table__cell">
                        {discount.duration}
                      </td>
                      <td className={`discount-table__cell discount-time-remaining ${remainingClass}`}>
                        {remainingTime}
                      </td>
                      <td className="discount-table__cell">
                        {displayStatus(discount.isActive)}
                      </td>
                      <td className="discount-table__cell discount-table__cell--discount">
                        {formatDiscountValue(discount)}
                      </td>
                      <td className="discount-table__cell">
                        <div className="discount-actions">
                          <button
                            onClick={() => discount.id !== undefined && onEditDiscount(discount.id)}
                            title="Edit Discount"
                            className="discount-action-button discount-action-button--edit"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(discount.id)}
                            title="Delete Discount"
                            className="discount-action-button discount-action-button--delete"
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
          <div className="discount-modal-overlay">
            <div className="discount-modal">
              <div className="discount-modal__header">
                <h3 className="discount-modal__title">Confirm Delete</h3>
                <button 
                  onClick={handleCloseConfirmation}
                  className="discount-modal__close-button"
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <p className="discount-modal__message">
                Are you sure you want to delete this loyalty discount? This action cannot be undone.
              </p>
              
              {deleteError && (
                <div className="discount-modal__error">
                  {deleteError}
                </div>
              )}
              
              <div className="discount-modal__footer">
                <button
                  onClick={handleCloseConfirmation}
                  className="discount-modal__cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="discount-modal__confirm-button"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
};

export default DiscountTableLoyalty;