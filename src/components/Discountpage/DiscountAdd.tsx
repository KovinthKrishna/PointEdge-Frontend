import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaSearch, FaChevronDown, FaCircle, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';
import './styles/DiscountAddStyle.css'; // Import the CSS file

import discountClient, { fetchProductNames, fetchCategoryNames, fetchDiscountNames as getDiscountNamesService } from '../../services/discountService';
import Discount from '../../models/Discount';

interface DiscountAddProps {
  onBack: () => void;
}

// Define interfaces for the data types
interface DiscountName {
  id: number;
  name: string;
}

interface ProductTable {
  id: number;
  name: string;
}

interface CategoryTable {
  id: number;
  name: string;
}

interface PercentageOption {
  id: number;
  value: number;
}

interface AmountOption {
  id: number;
  value: number;
  currency: string;
}

interface TierOption {
  id: number;
  name: string;
}

interface DurationOption {
  id: number;
  value: string;
}

interface Notification {
  message: string;
  type: 'success' | 'error';
  id: number;
}

const DiscountAdd: React.FC<DiscountAddProps> = ({ onBack }) => {
  const [discountType, setDiscountType] = useState('item');
  const [enableDiscount, setEnableDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState({
    discountNames: false,
    items: false,
    categories: false,
    percentages: false,
    amounts: false,
    tiers: false,
    durations: false
  });
  
  // Selected values
  const [selectedDiscountName, setSelectedDiscountName] = useState<DiscountName | null>(null);
  const [selectedItem, setSelectedItem] = useState<ProductTable | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryTable | null>(null);
  const [selectedPercentage, setSelectedPercentage] = useState<PercentageOption | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<AmountOption | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierOption | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<DurationOption | null>(null);
  
  // Search states
  const [discountNameSearch, setDiscountNameSearch] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [percentageSearch, setPercentageSearch] = useState('');
  const [amountSearch, setAmountSearch] = useState('');
<<<<<<< HEAD
  const [tierSearch, setTierSearch] = useState('');
=======
  const [] = useState('');
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const [durationSearch, setDurationSearch] = useState('');
  
  // Add new states
  const [isAddingNew, setIsAddingNew] = useState({
    discountName: false,
    percentage: false,
    amount: false,
    duration: false
  });
  
  const [newDiscountName, setNewDiscountName] = useState('');
  const [newPercentage, setNewPercentage] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDuration, setNewDuration] = useState('');

  // Notification state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Data states
  const [discountNames, setDiscountNames] = useState<DiscountName[]>([]);
  const [items, setItems] = useState<ProductTable[]>([]);
  const [categories, setCategories] = useState<CategoryTable[]>([]);
  const [percentages, setPercentages] = useState<PercentageOption[]>([]);
  const [amounts, setAmounts] = useState<AmountOption[]>([]);
  const [tiers] = useState<TierOption[]>([
    { id: 1, name: 'Gold' },
    { id: 2, name: 'Silver' },
    { id: 3, name: 'Bronze' }
  ]);
  const [durations, setDurations] = useState<DurationOption[]>([]);
  
  const [dropdownOpen, setDropdownOpen] = useState({
    discountName: false,
    item: false,
    category: false,
    amount: false,
    percentage: false,
    tier: false,
    duration: false
  });

  // Refs for dropdown containers
  const dropdownRefs = {
    discountName: useRef<HTMLDivElement>(null),
    item: useRef<HTMLDivElement>(null),
    category: useRef<HTMLDivElement>(null),
    percentage: useRef<HTMLDivElement>(null),
    amount: useRef<HTMLDivElement>(null),
    tier: useRef<HTMLDivElement>(null),
    duration: useRef<HTMLDivElement>(null)
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdowns = Object.keys(dropdownRefs).map(key => dropdownRefs[key as keyof typeof dropdownRefs].current);
      if (!dropdowns.some(dropdown => dropdown?.contains(event.target as Node))) {
        setDropdownOpen({
          discountName: false,
          item: false,
          category: false,
          amount: false,
          percentage: false,
          tier: false,
          duration: false
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show notification function
  const showNotification = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { message, type, id }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Check dropdown position and adjust if needed
  const checkDropdownPosition = (dropdownKey: keyof typeof dropdownRefs) => {
    const dropdownElement = dropdownRefs[dropdownKey].current;
    if (!dropdownElement) return false;

    const rect = dropdownElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 220; // Approximate height of dropdown with search and items

    return spaceBelow < dropdownHeight;
  };

  // Toggle dropdown with position check
  const toggleDropdown = (dropdownKey: keyof typeof dropdownOpen) => {
    setDropdownOpen(prev => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key as keyof typeof prev] = key === dropdownKey ? !prev[key as keyof typeof prev] : false;
        return acc;
      }, {} as typeof prev);
      return newState;
    });
  };

  // Fetch data from backend
  useEffect(() => {
    loadDiscountNames();
    fetchItems();
    fetchCategories();
    fetchPercentages();
    fetchAmounts();
    fetchDurations();
  }, []);

  const loadDiscountNames = async () => {
    setIsLoading(prev => ({ ...prev, discountNames: true }));
    try {
      const names = await getDiscountNamesService();
      
      if (Array.isArray(names)) {
        const formattedNames = names.map((name, index) => ({
          id: index + 1,
          name: Array.isArray(name) ? name.join(', ') : name
        }));
        setDiscountNames(formattedNames);
      } else {
        console.error('Unexpected response format from getDiscountNamesService:', names);
        setDiscountNames([
          { id: 1, name: 'Black Friday' },
          { id: 2, name: 'Weekly' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching discount names:', error);
      setDiscountNames([
        { id: 1, name: 'Black Friday' },
        { id: 2, name: 'Weekly' }
      ]);
    } finally {
      setIsLoading(prev => ({ ...prev, discountNames: false }));
    }
  };

  const fetchItems = async () => {
    setIsLoading(prev => ({ ...prev, items: true }));
    try {
      const items = await fetchProductNames();
      setItems(items); // Now directly using the response
    } catch (error) {
      console.error('Error fetching product names:', error);
      setItems([
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' }
      ]);
    } finally {
      setIsLoading(prev => ({ ...prev, items: false }));
    }
  };
  
  const fetchCategories = async () => {
    setIsLoading(prev => ({ ...prev, items: true }));
    try {
      const Categories = await fetchCategoryNames();
      setCategories(Categories); // Now directly using the response
    } catch (error) {
      console.error('Error fetching Category names:', error);
      setCategories([
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' }
      ]);
    } finally {
      setIsLoading(prev => ({ ...prev, items: false }));
    }
  };

  const fetchPercentages = async () => {
    setIsLoading(prev => ({ ...prev, percentages: true }));
    try {
      // Replace with actual API call
      const response = await fetch('/api/percentages');
      const data = await response.json();
      setPercentages(data);
    } catch (error) {
      console.error('Error fetching percentages:', error);
      setPercentages([
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 5 },
        { id: 4, value: 10 },
        { id: 5, value: 15 },
        { id: 6, value: 20 },
        { id: 7, value: 25 }
      ]);
    } finally {
      setIsLoading(prev => ({ ...prev, percentages: false }));
    }
  };

  const fetchAmounts = async () => {
    setIsLoading(prev => ({ ...prev, amounts: true }));
    try {
      // Replace with actual API call
      const response = await fetch('/api/amounts');
      const data = await response.json();
      setAmounts(data);
    } catch (error) {
      console.error('Error fetching amounts:', error);
      setAmounts([
        { id: 1, value: 50, currency: 'Rs' },
        { id: 2, value: 100, currency: 'Rs' },
        { id: 3, value: 150, currency: 'Rs' },
        { id: 4, value: 200, currency: 'Rs' },
        { id: 5, value: 500, currency: 'Rs' },
        { id: 6, value: 750, currency: 'Rs' },
        { id: 7, value: 1000, currency: 'Rs' }
      ]);
    } finally {
      setIsLoading(prev => ({ ...prev, amounts: false }));
    }
  };

  const fetchDurations = async () => {
    setIsLoading(prev => ({ ...prev, durations: true }));
    try {
      // Replace with actual API call
      const response = await fetch('/api/durations');
      const data = await response.json();
      setDurations(data);
    } catch (error) {
      console.error('Error fetching durations:', error);
      setDurations([
        { id: 1, value: '1 Hour' },
        { id: 2, value: '2 Hours' },
        { id: 3, value: '6 Hours' },
        { id: 4, value: '8 Hours' },
        { id: 5, value: '12 Hours' },
        { id: 6, value: '1 Day' },
        { id: 7, value: '7 Days' }
      ]);
    } finally {
      setIsLoading(prev => ({ ...prev, durations: false }));
    }
  };

  const handleAddNewDiscountName = async () => {
    if (!newDiscountName.trim()) return;
    
    setIsLoading(prev => ({ ...prev, discountNames: true }));
    try {
      // Replace with actual API call
      const response = await fetch('/api/discount-names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newDiscountName }),
      });
      const newItem = await response.json();
      
      setDiscountNames(prev => [...prev, newItem]);
      setSelectedDiscountName(newItem);
      setNewDiscountName('');
      setIsAddingNew(prev => ({ ...prev, discountName: false }));
    } catch (error) {
      console.error('Error adding new discount name:', error);
      const newItem = { id: discountNames.length + 1, name: newDiscountName };
      setDiscountNames(prev => [...prev, newItem]);
      setSelectedDiscountName(newItem);
      setNewDiscountName('');
      setIsAddingNew(prev => ({ ...prev, discountName: false }));
    } finally {
      setIsLoading(prev => ({ ...prev, discountNames: false }));
      setDropdownOpen(prev => ({ ...prev, discountName: false }));
    }
  };

  const handleAddNewPercentage = async () => {
    const percentValue = parseFloat(newPercentage);
    if (isNaN(percentValue) || percentValue < 0 || percentValue > 100) {
      showNotification('Please enter a valid percentage between 0 and 100', 'error');
      return;
    }
    
    setIsLoading(prev => ({ ...prev, percentages: true }));
    try {
      // Replace with actual API call
      const response = await fetch('/api/percentages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: percentValue }),
      });
      const newItem = await response.json();
      
      setPercentages(prev => [...prev, newItem]);
      setSelectedPercentage(newItem);
      setNewPercentage('');
      setIsAddingNew(prev => ({ ...prev, percentage: false }));
    } catch (error) {
      console.error('Error adding new percentage:', error);
      const newItem = { id: percentages.length + 1, value: percentValue };
      setPercentages(prev => [...prev, newItem]);
      setSelectedPercentage(newItem);
      setNewPercentage('');
      setIsAddingNew(prev => ({ ...prev, percentage: false }));
    } finally {
      setIsLoading(prev => ({ ...prev, percentages: false }));
      setDropdownOpen(prev => ({ ...prev, percentage: false }));
    }
  };

  const handleAddNewAmount = async () => {
    const amountValue = parseFloat(newAmount);
    if (isNaN(amountValue) || amountValue <= 0) {
      showNotification('Please enter a valid amount', 'error');
      return;
    }
    
    setIsLoading(prev => ({ ...prev, amounts: true }));
    try {
      // Replace with actual API call
      const response = await fetch('/api/amounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: amountValue, currency: 'Rs' }),
      });
      const newItem = await response.json();
      
      setAmounts(prev => [...prev, newItem]);
      setSelectedAmount(newItem);
      setNewAmount('');
      setIsAddingNew(prev => ({ ...prev, amount: false }));
    } catch (error) {
      console.error('Error adding new amount:', error);
      const newItem = { id: amounts.length + 1, value: amountValue, currency: 'Rs' };
      setAmounts(prev => [...prev, newItem]);
      setSelectedAmount(newItem);
      setNewAmount('');
      setIsAddingNew(prev => ({ ...prev, amount: false }));
    } finally {
      setIsLoading(prev => ({ ...prev, amounts: false }));
      setDropdownOpen(prev => ({ ...prev, amount: false }));
    }
  };

  const handleAddNewDuration = async () => {
    if (!newDuration.trim()) return;
    
    setIsLoading(prev => ({ ...prev, durations: true }));
    try {
      // Replace with actual API call
      const response = await fetch('/api/durations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: newDuration }),
      });
      const newItem = await response.json();
      
      setDurations(prev => [...prev, newItem]);
      setSelectedDuration(newItem);
      setNewDuration('');
      setIsAddingNew(prev => ({ ...prev, duration: false }));
    } catch (error) {
      console.error('Error adding new duration:', error);
      const newItem = { id: durations.length + 1, value: newDuration };
      setDurations(prev => [...prev, newItem]);
      setSelectedDuration(newItem);
      setNewDuration('');
      setIsAddingNew(prev => ({ ...prev, duration: false }));
    } finally {
      setIsLoading(prev => ({ ...prev, durations: false }));
      setDropdownOpen(prev => ({ ...prev, duration: false }));
    }
  };

  const handleSaveDiscount = async () => {
    if (!selectedDiscountName) {
      showNotification('Please select a discount name', 'error');
      return;
    }
    
    if (discountType === 'item' && !selectedItem) {
      showNotification('Please select an item', 'error');
      return;
    }
    
    if (discountType === 'category' && !selectedCategory) {
      showNotification('Please select a category', 'error');
      return;
    }
    
    if (discountType === 'loyalty' && !selectedTier) {
      showNotification('Please select a loyalty tier', 'error');
      return;
    }
    
    if (!selectedPercentage && !selectedAmount) {
      showNotification('Please select either a percentage or an amount', 'error');
      return;
    }
    
    if (selectedPercentage && selectedAmount) {
      showNotification('Please select only one discount value (percentage OR amount)', 'error');
      return;
    }
    
    if (!selectedDuration) {
      showNotification('Please select a duration', 'error');
      return;
    }

    const discountData: Discount = {
      name: selectedDiscountName.name,
      type: discountType.toUpperCase() as 'ITEM' | 'CATEGORY' | 'LOYALTY',
      isActive: enableDiscount,
      duration: selectedDuration.value,
      startDate: new Date().toISOString(),
      ...(discountType === 'item' && { 
        itemId: selectedItem?.id,
        categoryId: null
      }),
      ...(discountType === 'category' && { 
        categoryId: selectedCategory?.id,
        itemId: null
      }),
      ...(discountType === 'loyalty' && {
        itemId: null,
        categoryId: null,
        loyaltyType: selectedTier?.name.toUpperCase() as 'GOLD' | 'SILVER' | 'BRONZE'
      }),
      ...(discountType !== 'loyalty' && selectedTier && {
        loyaltyType: selectedTier?.name.toUpperCase() as 'GOLD' | 'SILVER' | 'BRONZE'
      }),
      ...(selectedPercentage && { percentage: selectedPercentage.value }),
      ...(selectedAmount && { amount: selectedAmount.value })
    };

    try {
      setIsLoading(prev => ({ ...prev, saving: true }));
      const response = await discountClient.post(discountData);
      
      if (response) {
        showNotification(
          `Discount "${selectedDiscountName.name}" created successfully!`, 
          'success'
        );
        
        // Clear form after successful submission
        setSelectedDiscountName(null);
        setSelectedItem(null);
        setSelectedCategory(null);
        setSelectedPercentage(null);
        setSelectedAmount(null);
        setSelectedTier(null);
        setSelectedDuration(null);
        setEnableDiscount(false);
        setDiscountType('item');

        setTimeout(() => {
          onBack();
        }, 1500);
        
        // Optional: reload discount names if needed
        await loadDiscountNames();
      } else {
        showNotification('Failed to save discount. Please try again.', 'error');
      }
    } catch (error: any) {
      console.error('Error saving discount:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'There was an error saving the discount. Please try again.';
      showNotification(`❌ ${errorMessage}`, 'error');
    } finally {
      setIsLoading(prev => ({ ...prev, saving: false }));
    }
  };

  // Filter functions
  const filteredDiscountNames = discountNames.filter(item => 
    item.name.toLowerCase().includes(discountNameSearch.toLowerCase())
  );
  
  const filteredItems = items.filter(item => 
    item?.name?.toLowerCase().includes(itemSearch.toLowerCase())
  );
  
  const filteredCategories = categories.filter(item => 
    item?.name?.toLowerCase().includes(categorySearch.toLowerCase())
  );
  
  const filteredPercentages = percentages.filter(item => 
    item.value.toString().includes(percentageSearch)
  );
  
  const filteredAmounts = amounts.filter(item => 
    item.value.toString().includes(amountSearch)
  );
  
<<<<<<< HEAD
  const filteredTiers = tiers.filter(item => 
    item.name.toLowerCase().includes(tierSearch.toLowerCase())
  );
  
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const filteredDurations = durations.filter(item => 
    item.value.toLowerCase().includes(durationSearch.toLowerCase())
  );

  // Notification component
  const NotificationContainer = () => (
<<<<<<< HEAD
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px'
    }}>
=======
    <div className="notification-container">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`notification ${notification.type}`}
        >
          {notification.type === 'success' ? (
<<<<<<< HEAD
            <FaCheck style={{ marginRight: '10px', fontSize: '1.2em' }} />
          ) : (
            <FaTimes style={{ marginRight: '10px', fontSize: '1.2em' }} />
=======
            <FaCheck className="notification-icon" />
          ) : (
            <FaTimes className="notification-icon" />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
          )}
          {notification.message}
        </div>
      ))}
    </div>
  );
  return (
<<<<<<< HEAD
    <div style={{ padding: '16px' }}>
      <NotificationContainer />
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Create New Discount</h1>
        
        <div style={{ display: 'flex', gap: '10px' }}>
=======
    <div className="discount-add-container">
      <NotificationContainer />
      
      <div className="discount-add-header">
        <h1>Create New Discount</h1>
        
        <div className="discount-add-buttons">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
          <button 
            onClick={onBack}
            className="back-btn"
          >
<<<<<<< HEAD
            <FaArrowLeft style={{ marginRight: '8px', fontSize: '14px', color: '#666' }} />
=======
            <FaArrowLeft className="back-icon" />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
            Back to Discounts
          </button>
          <button 
            className="save-btn"
            onClick={handleSaveDiscount}
          >
            Add Discount
          </button>
        </div>
      </div>
      
<<<<<<< HEAD
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
                className={`discount-type-btn ${discountType === 'item' ? 'active' : ''}`}
                style={{
                  padding: '6px 10px',
                  background: discountType === 'item' ? '#008ED8' : '#f5f5f5',
                  color: discountType === 'item' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  opacity: 1,
                  fontSize: '13px',
                  transition: 'all 0.2s ease'
                }}
=======
      <div className="discount-add-form-container">
        {/* Discount Type with Enable Toggle */}
        <div className="discount-type-container">
          <div className="discount-type-selector">
            <h3>Discount Type</h3>
            <div className="discount-type-buttons">
              <button 
                onClick={() => setDiscountType('item')}
                className={`discount-type-btn ${discountType === 'item' ? 'active' : ''}`}
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              >
                Item Discount
              </button>
              <button 
                onClick={() => setDiscountType('category')}
                className={`discount-type-btn ${discountType === 'category' ? 'active' : ''}`}
<<<<<<< HEAD
                style={{
                  padding: '6px 10px',
                  background: discountType === 'category' ? '#008ED8' : '#f5f5f5',
                  color: discountType === 'category' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  opacity: 1,
                  fontSize: '13px',
                  transition: 'all 0.2s ease'
                }}
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              >
                Category Discount
              </button>
              <button 
                onClick={() => setDiscountType('loyalty')}
                className={`discount-type-btn ${discountType === 'loyalty' ? 'active' : ''}`}
<<<<<<< HEAD
                style={{
                  padding: '6px 10px',
                  background: discountType === 'loyalty' ? '#008ED8' : '#f5f5f5',
                  color: discountType === 'loyalty' ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  opacity: 1,
                  fontSize: '13px',
                  transition: 'all 0.2s ease'
                }}
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              >
                Loyalty Discount
              </button>
            </div>
          </div>
<<<<<<< HEAD
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
                background: enableDiscount ? '#4CAF50' : '#F44336', // green or red background
                borderRadius: '9px',
                position: 'relative',
                cursor: 'pointer',
                marginRight: '8px',
                transition: 'background 0.2s ease'
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaCircle 
                style={{ 
                  color: enableDiscount ? '#4CAF50' : '#F44336', // green or red dot
                  fontSize: '9px', 
                  marginRight: '4px' 
                }} 
              />
              <span style={{ fontSize: '13px' }}>
=======
          <div className="discount-toggle-container">
            <div 
              onClick={() => setEnableDiscount(!enableDiscount)}
              className="toggle-switch"
            >
              <div className="toggle-switch-handle" style={{ left: enableDiscount ? '20px' : '2px' }} />
            </div>
            <div className="toggle-label">
              <FaCircle className={`toggle-icon ${enableDiscount ? 'active' : 'inactive'}`} />
              <span>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                {enableDiscount ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Two column layout for form fields */}
<<<<<<< HEAD
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -8px' }}>
          {/* Left Column */}
          <div style={{ flex: '1 1 50%', minWidth: '280px', padding: '0 8px' }}>
            {/* Discount Name Dropdown */}
            <div className="dropdown-container" ref={dropdownRefs.discountName}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Discount Name</h3>
=======
        <div className="discount-form-columns">
          {/* Left Column */}
          <div className="discount-form-column">
            {/* Discount Name Dropdown */}
            <div className="dropdown-container" ref={dropdownRefs.discountName}>
              <h3>Discount Name</h3>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              <div 
                className="dropdown-header"
                onClick={() => toggleDropdown('discountName')}
              >
                <span>{selectedDiscountName ? selectedDiscountName.name : 'Select discount name'}</span>
<<<<<<< HEAD
                <FaChevronDown style={{ fontSize: '11px' }} />
=======
                <FaChevronDown className="dropdown-chevron" />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              </div>
              {dropdownOpen.discountName && (
                <div className={`dropdown-list ${checkDropdownPosition('discountName') ? 'upward' : ''}`}>
                  {!isAddingNew.discountName ? (
                    <div 
                      onClick={() => setIsAddingNew(prev => ({ ...prev, discountName: true }))}
                      className="add-new-btn"
                    >
<<<<<<< HEAD
                      <FaPlus style={{ fontSize: '10px', marginRight: '6px' }} /> Add New
=======
                      <FaPlus className="add-new-icon" /> Add New
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                    </div>
                  ) : (
                    <div className="add-new-container">
                      <input 
                        type="text"
                        placeholder="Enter new discount name"
                        value={newDiscountName}
                        onChange={(e) => setNewDiscountName(e.target.value)}
                        className="add-new-input"
                      />
                      <button
                        disabled={!newDiscountName.trim()}
                        onClick={handleAddNewDiscountName}
                        className="add-new-confirm"
                      >
                        Add
                      </button>
                    </div>
                  )}
                  <div className="dropdown-search">
                    <FaSearch className="dropdown-search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search discount names..."
                      value={discountNameSearch}
                      onChange={(e) => setDiscountNameSearch(e.target.value)}
                      className="dropdown-search-input"
                    />
                  </div>
<<<<<<< HEAD
                  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
=======
                  <div className="dropdown-items-container">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                    {isLoading.discountNames ? (
                      <div className="dropdown-item">Loading...</div>
                    ) : (
                      <>
                        <div 
                          onClick={() => {
                            setSelectedDiscountName(null);
                            toggleDropdown('discountName');
                          }}
                          className={`dropdown-item ${!selectedDiscountName ? 'selected' : ''}`}
                        >
                          None
                        </div>
                        {filteredDiscountNames.map(item => (
                          <div 
                            key={item.id}
                            onClick={() => {
                              setSelectedDiscountName(item);
                              toggleDropdown('discountName');
                            }}
                            className={`dropdown-item ${selectedDiscountName?.id === item.id ? 'selected' : ''}`}
                          >
                            {item.name}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Item Search Dropdown (shown for Item Discount) */}
            {discountType === 'item' && (
              <div className="dropdown-container" ref={dropdownRefs.item}>
<<<<<<< HEAD
                <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Select Item</h3>
=======
                <h3>Select Item</h3>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                <div 
                  className="dropdown-header"
                  onClick={() => toggleDropdown('item')}
                >
                  <span>{selectedItem ? selectedItem.name : 'Select Item'}</span>
<<<<<<< HEAD
                  <FaChevronDown style={{ fontSize: '11px' }} />
=======
                  <FaChevronDown className="dropdown-chevron" />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                </div>
                {dropdownOpen.item && (
                  <div className={`dropdown-list ${checkDropdownPosition('item') ? 'upward' : ''}`}>
                    <div className="dropdown-search">
                      <FaSearch className="dropdown-search-icon" />
                      <input 
                        type="text" 
                        placeholder="Search items..."
                        value={itemSearch}
                        onChange={(e) => {
                          setItemSearch(e.target.value);
                          if (selectedItem && !e.target.value.toLowerCase().includes(selectedItem.name.toLowerCase())) {
                            setSelectedItem(null);
                          }
                        }}
                        className="dropdown-search-input"
                      />
                    </div>
<<<<<<< HEAD
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
=======
                    <div className="dropdown-items-container">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                      {isLoading.items ? (
                        <div className="dropdown-item">Loading...</div>
                      ) : filteredItems.length > 0 ? (
                        <>
                          <div 
                            onClick={() => {
                              setSelectedItem(null);
                              toggleDropdown('item');
                            }}
                            className={`dropdown-item ${!selectedItem ? 'selected' : ''}`}
                          >
                            None
                          </div>
                          {filteredItems.map(item => (
                            <div 
                              key={item.id}
                              onClick={() => {
                                setSelectedItem(item);
                                toggleDropdown('item');
                              }}
                              className={`dropdown-item ${selectedItem?.id === item.id ? 'selected' : ''}`}
                            >
                              {item.name}
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="dropdown-item">No items found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Category Dropdown */}
            {discountType === 'category' && (
              <div className="dropdown-container" ref={dropdownRefs.category}>
<<<<<<< HEAD
                <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Select Category</h3>
=======
                <h3>Select Category</h3>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                <div 
                  className="dropdown-header"
                  onClick={() => toggleDropdown('category')}
                >
                  <span>{selectedCategory ? selectedCategory.name : 'Select category'}</span>
<<<<<<< HEAD
                  <FaChevronDown style={{ fontSize: '11px' }} />
=======
                  <FaChevronDown className="dropdown-chevron" />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                </div>
                {dropdownOpen.category && (
                  <div className={`dropdown-list ${checkDropdownPosition('category') ? 'upward' : ''}`}>
                    <div className="dropdown-search">
                      <FaSearch className="dropdown-search-icon" />
                      <input 
                        type="text" 
                        placeholder="Search categories..."
                        value={categorySearch}
                        onChange={(e) => {
                          setCategorySearch(e.target.value);
                          if (selectedCategory && !e.target.value.toLowerCase().includes(selectedCategory.name.toLowerCase())) {
                            setSelectedCategory(null);
                          }
                        }}
                        className="dropdown-search-input"
                      />
                    </div>
<<<<<<< HEAD
                    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
=======
                    <div className="dropdown-items-container">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                      {isLoading.categories ? (
                        <div className="dropdown-item">Loading...</div>
                      ) : filteredCategories.length > 0 ? (
                        <>
                          <div 
                            onClick={() => {
                              setSelectedCategory(null);
                              toggleDropdown('category');
                            }}
                            className={`dropdown-item ${!selectedCategory ? 'selected' : ''}`}
                          >
                            None
                          </div>
                          {filteredCategories.map(item => (
                            <div 
                              key={item.id}
                              onClick={() => {
                                setSelectedCategory(item);
                                toggleDropdown('category');
                              }}
                              className={`dropdown-item ${selectedCategory?.id === item.id ? 'selected' : ''}`}
                            >
                              {item.name}
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="dropdown-item">No categories found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
  
            {/* Tier Dropdown - Always visible */}
            <div className="dropdown-container" ref={dropdownRefs.tier}>
<<<<<<< HEAD
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Select Tier</h3>
=======
              <h3>Select Tier</h3>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              <div 
                className="dropdown-header"
                onClick={() => toggleDropdown('tier')}
              >
                <span>{selectedTier ? selectedTier.name : 'Select tier'}</span>
<<<<<<< HEAD
                <FaChevronDown style={{ fontSize: '11px' }} />
              </div>
              {dropdownOpen.tier && (
                <div className={`dropdown-list ${checkDropdownPosition('tier') ? 'upward' : ''}`}>
                  <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
=======
                <FaChevronDown className="dropdown-chevron" />
              </div>
              {dropdownOpen.tier && (
                <div className={`dropdown-list ${checkDropdownPosition('tier') ? 'upward' : ''}`}>
                  <div className="dropdown-items-container">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                    <div 
                      onClick={() => {
                        setSelectedTier(null);
                        toggleDropdown('tier');
                      }}
                      className={`dropdown-item ${!selectedTier ? 'selected' : ''}`}
                    >
                      None
                    </div>
                    {tiers.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setSelectedTier(item);
                          toggleDropdown('tier');
                        }}
                        className={`dropdown-item ${selectedTier?.id === item.id ? 'selected' : ''}`}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
  
          {/* Right Column */}
<<<<<<< HEAD
          <div style={{ flex: '1 1 50%', minWidth: '280px', padding: '0 8px' }}>
            {/* Percentage Dropdown */}
            <div className="dropdown-container" ref={dropdownRefs.percentage}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Percentage</h3>
=======
          <div className="discount-form-column">
            {/* Percentage Dropdown */}
            <div className="dropdown-container" ref={dropdownRefs.percentage}>
              <h3>Percentage</h3>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              <div 
                className={`dropdown-header ${selectedAmount ? 'dropdown-disabled' : ''}`}
                onClick={() => !selectedAmount && toggleDropdown('percentage')}
              >
                <span>{selectedPercentage ? `${selectedPercentage.value}%` : 'Select percentages'}</span>
<<<<<<< HEAD
                <FaChevronDown style={{ fontSize: '11px' }} />
=======
                <FaChevronDown className="dropdown-chevron" />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              </div>
              {dropdownOpen.percentage && !selectedAmount && (
                <div className={`dropdown-list ${checkDropdownPosition('percentage') ? 'upward' : ''}`}>
                  {!isAddingNew.percentage ? (
                    <div 
                      onClick={() => setIsAddingNew(prev => ({ ...prev, percentage: true }))}
                      className="add-new-btn"
                    >
<<<<<<< HEAD
                      <FaPlus style={{ fontSize: '10px', marginRight: '6px' }} /> Add New
=======
                      <FaPlus className="add-new-icon" /> Add New
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                    </div>
                  ) : (
                    <div className="add-new-container">
                      <input 
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="Enter percentage (0-100)"
                        value={newPercentage}
                        onChange={(e) => setNewPercentage(e.target.value)}
                        className="add-new-input"
                      />
                      <button
                        disabled={!newPercentage}
                        onClick={handleAddNewPercentage}
                        className="add-new-confirm"
                      >
                        Add
                      </button>
                    </div>
                  )}
                  <div className="dropdown-search">
                    <FaSearch className="dropdown-search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search percentages..."
                      value={percentageSearch}
                      onChange={(e) => setPercentageSearch(e.target.value)}
                      className="dropdown-search-input"
                    />
                  </div>
<<<<<<< HEAD
                  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
=======
                  <div className="dropdown-items-container">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                    {isLoading.percentages ? (
                      <div className="dropdown-item">Loading...</div>
                    ) : (
                      <>
                        <div 
                          onClick={() => {
                            setSelectedPercentage(null);
                            toggleDropdown('percentage');
                          }}
                          className={`dropdown-item ${!selectedPercentage ? 'selected' : ''}`}
                        >
                          None
                        </div>
                        {filteredPercentages.map(item => (
                          <div 
                            key={item.id}
                            onClick={() => {
                              setSelectedPercentage(item);
                              toggleDropdown('percentage');
                            }}
                            className={`dropdown-item ${selectedPercentage?.id === item.id ? 'selected' : ''}`}
                          >
                            {item.value}%
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
  
            {/* Amount Dropdown */}
            <div className="dropdown-container" ref={dropdownRefs.amount}>
<<<<<<< HEAD
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Amount</h3>
=======
              <h3>Amount</h3>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              <div 
                className={`dropdown-header ${selectedPercentage ? 'dropdown-disabled' : ''}`}
                onClick={() => !selectedPercentage && toggleDropdown('amount')}
              >
                <span>{selectedAmount ? `${selectedAmount.currency} ${selectedAmount.value.toFixed(2)}` : 'Select amounts'}</span>
<<<<<<< HEAD
                <FaChevronDown style={{ fontSize: '11px' }} />
=======
                <FaChevronDown className="dropdown-chevron" />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              </div>
              {dropdownOpen.amount && !selectedPercentage && (
                <div className={`dropdown-list ${checkDropdownPosition('amount') ? 'upward' : ''}`}>
                  {!isAddingNew.amount ? (
                    <div 
                      onClick={() => setIsAddingNew(prev => ({ ...prev, amount: true }))}
                      className="add-new-btn"
                    >
<<<<<<< HEAD
                      <FaPlus style={{ fontSize: '10px', marginRight: '6px' }} /> Add New
=======
                      <FaPlus className="add-new-icon" /> Add New
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                    </div>
                  ) : (
                    <div className="add-new-container">
                      <input 
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter amount"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        className="add-new-input"
                      />
                      <button
                        disabled={!newAmount}
                        onClick={handleAddNewAmount}
                        className="add-new-confirm"
                      >
                        Add
                      </button>
                    </div>
                  )}
                  <div className="dropdown-search">
                    <FaSearch className="dropdown-search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search amounts..."
                      value={amountSearch}
                      onChange={(e) => setAmountSearch(e.target.value)}
                      className="dropdown-search-input"
                    />
                  </div>
<<<<<<< HEAD
                  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
=======
                  <div className="dropdown-items-container">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                    {isLoading.amounts ? (
                      <div className="dropdown-item">Loading...</div>
                    ) : (
                      <>
                        <div 
                          onClick={() => {
                            setSelectedAmount(null);
                            toggleDropdown('amount');
                          }}
                          className={`dropdown-item ${!selectedAmount ? 'selected' : ''}`}
                        >
                          None
                        </div>
                        {filteredAmounts.map(item => (
                          <div 
                            key={item.id}
                            onClick={() => {
                              setSelectedAmount(item);
                              toggleDropdown('amount');
                            }}
                            className={`dropdown-item ${selectedAmount?.id === item.id ? 'selected' : ''}`}
                          >
                            {item.currency} {item.value.toFixed(2)}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
  
            {/* Duration Dropdown */}
            <div className="dropdown-container" ref={dropdownRefs.duration}>
<<<<<<< HEAD
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Duration</h3>
=======
              <h3>Duration</h3>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              <div 
                className="dropdown-header"
                onClick={() => toggleDropdown('duration')}
              >
                <span>{selectedDuration ? selectedDuration.value : 'Select durations'}</span>
<<<<<<< HEAD
                <FaChevronDown style={{ fontSize: '11px' }} />
=======
                <FaChevronDown className="dropdown-chevron" />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              </div>
              {dropdownOpen.duration && (
                <div className={`dropdown-list ${checkDropdownPosition('duration') ? 'upward' : ''}`}>
                  {!isAddingNew.duration ? (
                    <div 
                      onClick={() => setIsAddingNew(prev => ({ ...prev, duration: true }))}
                      className="add-new-btn"
                    >
<<<<<<< HEAD
                      <FaPlus style={{ fontSize: '10px', marginRight: '6px' }} /> Add New
=======
                      <FaPlus className="add-new-icon" /> Add New
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                    </div>
                  ) : (
                    <div className="add-new-container">
                      <input 
                        type="text"
                        placeholder="Enter duration (e.g., 3 Hours)"
                        value={newDuration}
                        onChange={(e) => setNewDuration(e.target.value)}
                        className="add-new-input"
                      />
                      <button
                        disabled={!newDuration.trim()}
                        onClick={handleAddNewDuration}
                        className="add-new-confirm"
                      >
                        Add
                      </button>
                    </div>
                  )}
                  <div className="dropdown-search">
                    <FaSearch className="dropdown-search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search durations..."
                      value={durationSearch}
                      onChange={(e) => setDurationSearch(e.target.value)}
                      className="dropdown-search-input"
                    />
                  </div>
<<<<<<< HEAD
                  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
=======
                  <div className="dropdown-items-container">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
                    {isLoading.durations ? (
                      <div className="dropdown-item">Loading...</div>
                    ) : (
                      <>
                        <div 
                          onClick={() => {
                            setSelectedDuration(null);
                            toggleDropdown('duration');
                          }}
                          className={`dropdown-item ${!selectedDuration ? 'selected' : ''}`}
                        >
                          None
                        </div>
                        {filteredDurations.map(item => (
                          <div 
                            key={item.id}
                            onClick={() => {
                              setSelectedDuration(item);
                              toggleDropdown('duration');
                            }}
                            className={`dropdown-item ${selectedDuration?.id === item.id ? 'selected' : ''}`}
                          >
                            {item.value}
                          </div>
                        ))}
                      </>
                    )}
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