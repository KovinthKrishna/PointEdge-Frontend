import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaSearch, FaChevronDown, FaCircle, FaPlus, FaCheck, FaTimes } from 'react-icons/fa';
import './styles/DiscountEditStyles.css';

import { 
  fetchProductNames, 
  fetchCategoryNames, 
  fetchDiscountNames as getDiscountNamesService,
  getDiscountById,
  updateDiscount
} from '../../services/discountService';
import Discount from '../../models/Discount';

interface DiscountEditProps {
  onBack: () => void;
  discountId: number;
}

interface DiscountName {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

interface Category {
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

const DiscountEdit: React.FC<DiscountEditProps> = ({ onBack, discountId }) => {
  const [originalDiscount, setOriginalDiscount] = useState<Discount | null>(null);
  const [discountType, setDiscountType] = useState<'item' | 'category' | 'loyalty'>('item');
  const [enableDiscount, setEnableDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState({
    discount: true,
    discountNames: false,
    items: false,
    categories: false,
    percentages: false,
    amounts: false,
    tiers: false,
    durations: false
  });
  
<<<<<<< HEAD
  // Notification state
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

<<<<<<< HEAD
  // Selected values
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const [selectedDiscountName, setSelectedDiscountName] = useState<DiscountName | null>(null);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedPercentage, setSelectedPercentage] = useState<PercentageOption | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<AmountOption | null>(null);
  const [selectedTier, setSelectedTier] = useState<TierOption | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<DurationOption | null>(null);
  
<<<<<<< HEAD
  // Search states
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const [discountNameSearch, setDiscountNameSearch] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [percentageSearch, setPercentageSearch] = useState('');
  const [amountSearch, setAmountSearch] = useState('');
<<<<<<< HEAD
  const [tierSearch, setTierSearch] = useState('');
  const [durationSearch, setDurationSearch] = useState('');
  
  // Add new states
=======
  const [] = useState('');
  const [durationSearch, setDurationSearch] = useState('');
  
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
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
  
<<<<<<< HEAD
  // Data states
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const [discountNames, setDiscountNames] = useState<DiscountName[]>([]);
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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

<<<<<<< HEAD
  // Refs for dropdown containers
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const dropdownRefs = {
    discountName: useRef<HTMLDivElement>(null),
    item: useRef<HTMLDivElement>(null),
    category: useRef<HTMLDivElement>(null),
    percentage: useRef<HTMLDivElement>(null),
    amount: useRef<HTMLDivElement>(null),
    tier: useRef<HTMLDivElement>(null),
    duration: useRef<HTMLDivElement>(null)
  };

<<<<<<< HEAD
  // Close dropdowns when clicking outside
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
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

<<<<<<< HEAD
  // Show notification
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

<<<<<<< HEAD
  // Load discount data and all necessary options
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all dropdown options first
=======
  useEffect(() => {
    const loadData = async () => {
      try {
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
        const [discountNamesData, itemsData, categoriesData] = await Promise.all([
          loadDiscountNames(),
          fetchItems(),
          fetchCategories()
        ]);

<<<<<<< HEAD
        // Then load the discount to edit
        const discount = await getDiscountById(discountId);
        setOriginalDiscount(discount);
        
        // Set form values from the loaded discount
        setDiscountType(discount.type.toLowerCase() as 'item' | 'category' | 'loyalty');
        setEnableDiscount(discount.isActive);
        
        // Load remaining options
=======
        const discount = await getDiscountById(discountId);
        setOriginalDiscount(discount);
        
        setDiscountType(discount.type.toLowerCase() as 'item' | 'category' | 'loyalty');
        setEnableDiscount(discount.isActive);
        
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
        await Promise.all([
          fetchPercentages(),
          fetchAmounts(),
          fetchDurations()
        ]);
        
<<<<<<< HEAD
        // Now that we have all data, set the selected values
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
        if (discount.name) {
          const foundName = discountNamesData.find(dn => dn.name === discount.name) || 
                          { id: discountNamesData.length + 1, name: discount.name };
          setSelectedDiscountName(foundName);
        }
        
        if (discount.itemId) {
          const foundItem = itemsData.find(i => i.id === discount.itemId) || null;
          setSelectedItem(foundItem);
        }
        
        if (discount.categoryId) {
          const foundCategory = categoriesData.find(c => c.id === discount.categoryId) || null;
          setSelectedCategory(foundCategory);
        }
        
        if (discount.percentage) {
          const foundPercentage = percentages.find(p => p.value === discount.percentage) || 
                                { id: percentages.length + 1, value: discount.percentage };
          setSelectedPercentage(foundPercentage);
        }
        
        if (discount.amount) {
          const foundAmount = amounts.find(a => a.value === discount.amount) || 
                            { id: amounts.length + 1, value: discount.amount, currency: 'Rs' };
          setSelectedAmount(foundAmount);
        }
        
        if (discount.loyaltyType) {
          const foundTier = tiers.find(t => t.name.toUpperCase() === discount.loyaltyType) || null;
          setSelectedTier(foundTier);
        }
        
        if (discount.duration) {
          const foundDuration = durations.find(d => d.value === discount.duration) || 
                              { id: durations.length + 1, value: discount.duration };
          setSelectedDuration(foundDuration);
        }
        
      } catch (error) {
        console.error('Error loading discount data:', error);
        showNotification('Failed to load discount data. Please try again.', 'error');
      } finally {
        setIsLoading(prev => ({ ...prev, discount: false }));
      }
    };
    
    loadData();
  }, [discountId]);

<<<<<<< HEAD
  // Check dropdown position and adjust if needed
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const checkDropdownPosition = (dropdownKey: keyof typeof dropdownRefs) => {
    const dropdownElement = dropdownRefs[dropdownKey].current;
    if (!dropdownElement) return false;

    const rect = dropdownElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 220;

    return spaceBelow < dropdownHeight;
  };

<<<<<<< HEAD
  // Toggle dropdown with position check
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const toggleDropdown = (dropdownKey: keyof typeof dropdownOpen) => {
    setDropdownOpen(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        newState[key as keyof typeof newState] = key === dropdownKey ? !prev[key as keyof typeof prev] : false;
      });
      return newState;
    });
  };

<<<<<<< HEAD
  // Fetch data from backend
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const loadDiscountNames = async (): Promise<DiscountName[]> => {
    setIsLoading(prev => ({ ...prev, discountNames: true }));
    try {
      const names = await getDiscountNamesService();
      
      if (Array.isArray(names)) {
        const formattedNames = names.map((name, index) => ({
          id: index + 1,
          name: typeof name === 'string' ? name : JSON.stringify(name)
        }));
        setDiscountNames(formattedNames);
        return formattedNames;
      } else {
        console.error('Unexpected response format from getDiscountNamesService:', names);
        const defaultNames = [
          { id: 1, name: 'Black Friday' },
          { id: 2, name: 'Weekly' }
        ];
        setDiscountNames(defaultNames);
        return defaultNames;
      }
    } catch (error) {
      console.error('Error fetching discount names:', error);
      const defaultNames = [
        { id: 1, name: 'Black Friday' },
        { id: 2, name: 'Weekly' }
      ];
      setDiscountNames(defaultNames);
      return defaultNames;
    } finally {
      setIsLoading(prev => ({ ...prev, discountNames: false }));
    }
  };

  const fetchItems = async (): Promise<Product[]> => {
    setIsLoading(prev => ({ ...prev, items: true }));
    try {
      const products = await fetchProductNames();
      
      const formattedItems = products.map((product) => ({ 
        id: product.id, 
        name: product.name
      }));
      
      setItems(formattedItems);
      return formattedItems;
    } catch (error) {
      console.error('Error fetching product names:', error);
      const defaultItems = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' }
      ];
      setItems(defaultItems);
      return defaultItems;
    } finally {
      setIsLoading(prev => ({ ...prev, items: false }));
    }
  };
  
  const fetchCategories = async (): Promise<Category[]> => {
    setIsLoading(prev => ({ ...prev, categories: true }));
    try {
      const categories = await fetchCategoryNames();
      
      const formattedCategories = categories.map((category) => ({ 
        id: category.id, 
        name: category.name
      }));
      
      setCategories(formattedCategories);
      return formattedCategories;
    } catch (error) {
      console.error('Error fetching category names:', error);
      const defaultCategories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' }
      ];
      setCategories(defaultCategories);
      return defaultCategories;
    } finally {
      setIsLoading(prev => ({ ...prev, categories: false }));
    }
  };

  const fetchPercentages = async () => {
    setIsLoading(prev => ({ ...prev, percentages: true }));
    try {
<<<<<<< HEAD
      // Simulate API call
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      await new Promise(resolve => setTimeout(resolve, 300));
      const defaultPercentages = [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 5 },
        { id: 4, value: 10 },
        { id: 5, value: 15 },
        { id: 6, value: 20 },
        { id: 7, value: 25 }
      ];
      setPercentages(defaultPercentages);
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
<<<<<<< HEAD
      // Simulate API call
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      await new Promise(resolve => setTimeout(resolve, 300));
      const defaultAmounts = [
        { id: 1, value: 50, currency: 'Rs' },
        { id: 2, value: 100, currency: 'Rs' },
        { id: 3, value: 150, currency: 'Rs' },
        { id: 4, value: 200, currency: 'Rs' },
        { id: 5, value: 500, currency: 'Rs' },
        { id: 6, value: 750, currency: 'Rs' },
        { id: 7, value: 1000, currency: 'Rs' }
      ];
      setAmounts(defaultAmounts);
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
<<<<<<< HEAD
      // Simulate API call
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      await new Promise(resolve => setTimeout(resolve, 300));
      const defaultDurations = [
        { id: 1, value: '1 Hour' },
        { id: 2, value: '2 Hours' },
        { id: 3, value: '6 Hours' },
        { id: 4, value: '8 Hours' },
        { id: 5, value: '12 Hours' },
        { id: 6, value: '1 Day' },
        { id: 7, value: '7 Days' }
      ];
      setDurations(defaultDurations);
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
<<<<<<< HEAD
      // Simulate API call
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      await new Promise(resolve => setTimeout(resolve, 300));
      const newItem = { 
        id: discountNames.length + 1, 
        name: newDiscountName 
      };
      
      setDiscountNames(prev => [...prev, newItem]);
      setSelectedDiscountName(newItem);
      setNewDiscountName('');
      setIsAddingNew(prev => ({ ...prev, discountName: false }));
      showNotification('Discount name added successfully!', 'success');
    } catch (error) {
      console.error('Error adding new discount name:', error);
      const newItem = { id: discountNames.length + 1, name: newDiscountName };
      setDiscountNames(prev => [...prev, newItem]);
      setSelectedDiscountName(newItem);
      setNewDiscountName('');
      setIsAddingNew(prev => ({ ...prev, discountName: false }));
      showNotification('Failed to add discount name', 'error');
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
<<<<<<< HEAD
      // Simulate API call
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      await new Promise(resolve => setTimeout(resolve, 300));
      const newItem = { 
        id: percentages.length + 1, 
        value: percentValue 
      };
      
      setPercentages(prev => [...prev, newItem]);
      setSelectedPercentage(newItem);
      setNewPercentage('');
      setIsAddingNew(prev => ({ ...prev, percentage: false }));
      showNotification('Percentage added successfully!', 'success');
    } catch (error) {
      console.error('Error adding new percentage:', error);
      const newItem = { id: percentages.length + 1, value: percentValue };
      setPercentages(prev => [...prev, newItem]);
      setSelectedPercentage(newItem);
      setNewPercentage('');
      setIsAddingNew(prev => ({ ...prev, percentage: false }));
      showNotification('Failed to add percentage', 'error');
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
<<<<<<< HEAD
      // Simulate API call
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      await new Promise(resolve => setTimeout(resolve, 300));
      const newItem = { 
        id: amounts.length + 1, 
        value: amountValue, 
        currency: 'Rs' 
      };
      
      setAmounts(prev => [...prev, newItem]);
      setSelectedAmount(newItem);
      setNewAmount('');
      setIsAddingNew(prev => ({ ...prev, amount: false }));
      showNotification('Amount added successfully!', 'success');
    } catch (error) {
      console.error('Error adding new amount:', error);
      const newItem = { id: amounts.length + 1, value: amountValue, currency: 'Rs' };
      setAmounts(prev => [...prev, newItem]);
      setSelectedAmount(newItem);
      setNewAmount('');
      setIsAddingNew(prev => ({ ...prev, amount: false }));
      showNotification('Failed to add amount', 'error');
    } finally {
      setIsLoading(prev => ({ ...prev, amounts: false }));
      setDropdownOpen(prev => ({ ...prev, amount: false }));
    }
  };

  const handleAddNewDuration = async () => {
    if (!newDuration.trim()) return;
    
    setIsLoading(prev => ({ ...prev, durations: true }));
    try {
<<<<<<< HEAD
      // Simulate API call
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      await new Promise(resolve => setTimeout(resolve, 300));
      const newItem = { 
        id: durations.length + 1, 
        value: newDuration 
      };
      
      setDurations(prev => [...prev, newItem]);
      setSelectedDuration(newItem);
      setNewDuration('');
      setIsAddingNew(prev => ({ ...prev, duration: false }));
      showNotification('Duration added successfully!', 'success');
    } catch (error) {
      console.error('Error adding new duration:', error);
      const newItem = { id: durations.length + 1, value: newDuration };
      setDurations(prev => [...prev, newItem]);
      setSelectedDuration(newItem);
      setNewDuration('');
      setIsAddingNew(prev => ({ ...prev, duration: false }));
      showNotification('Failed to add duration', 'error');
    } finally {
      setIsLoading(prev => ({ ...prev, durations: false }));
      setDropdownOpen(prev => ({ ...prev, duration: false }));
    }
  };

  const handleUpdateDiscount = async () => {
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
      id: discountId,
      name: selectedDiscountName.name,
      type: discountType.toUpperCase() as 'ITEM' | 'CATEGORY' | 'LOYALTY',
      isActive: enableDiscount,
      duration: selectedDuration.value,
      startDate: originalDiscount?.startDate || new Date().toISOString(),
<<<<<<< HEAD
      // Set fields based on discount type
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
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
<<<<<<< HEAD
      // Optional loyalty tier for item/category discounts
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      ...(discountType !== 'loyalty' && selectedTier && {
        loyaltyType: selectedTier?.name.toUpperCase() as 'GOLD' | 'SILVER' | 'BRONZE'
      }),
      ...(selectedPercentage && { percentage: selectedPercentage.value }),
      ...(selectedAmount && { amount: selectedAmount.value })
    };

    try {
<<<<<<< HEAD
      console.log('Sending discount data:', discountData);
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
      const response = await updateDiscount(discountId, discountData);
      
      if (response) {
        showNotification('Discount updated successfully!', 'success');
        setTimeout(() => {
          onBack();
        }, 1500);
      } else {
        showNotification('Failed to update discount', 'error');
      }
    } catch (error: any) {
      console.error('Error updating discount:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'There was an error updating the discount. Please try again.';
      showNotification(errorMessage, 'error');
    }
  };

<<<<<<< HEAD
  // Filter functions
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
  const filteredDiscountNames = discountNames.filter(item => 
    item.name.toLowerCase().includes(discountNameSearch.toLowerCase())
  );
  
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(itemSearch.toLowerCase())
  );
  
  const filteredCategories = categories.filter(item => 
    item.name.toLowerCase().includes(categorySearch.toLowerCase())
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

  if (isLoading.discount) {
    return (
<<<<<<< HEAD
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Edit Discount</h1>
=======
      <div className="discount-edit-loading">
        <h1>Edit Discount</h1>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
        <p>Loading discount data...</p>
      </div>
    );
  }

  if (!originalDiscount) {
    return (
<<<<<<< HEAD
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Edit Discount</h1>
=======
      <div className="discount-edit-not-found">
        <h1>Edit Discount</h1>
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
        <p>Discount not found</p>
        <button 
          onClick={onBack}
          className="back-btn"
<<<<<<< HEAD
          style={{ marginTop: '16px' }}
        >
          <FaArrowLeft style={{ marginRight: '8px', fontSize: '14px', color: '#666' }} />
=======
        >
          <FaArrowLeft className="back-icon" />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
          Back to Discounts
        </button>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div style={{ padding: '16px' }}>
      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? (
            <FaCheck style={{ marginRight: '10px' }} />
          ) : (
            <FaTimes style={{ marginRight: '10px' }} />
=======
    <div className="discount-edit-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? (
            <FaCheck className="notification-icon" />
          ) : (
            <FaTimes className="notification-icon" />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
          )}
          {notification.message}
        </div>
      )}

<<<<<<< HEAD
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Edit Discount</h1>
        
        <div style={{ display: 'flex', gap: '10px' }}>
=======
      <div className="discount-edit-header">
        <h1>Edit Discount</h1>
        
        <div className="discount-edit-buttons">
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
            onClick={handleUpdateDiscount}
          >
            Update Discount
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
=======
      <div className="discount-edit-form-container">
        <div className="discount-type-container">
          <div className="discount-type-selector">
            <h3>Discount Type</h3>
            <div className="discount-type-buttons">
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              <button 
                onClick={() => setDiscountType('item')}
                className={`discount-type-btn ${discountType === 'item' ? 'active' : ''}`}
                disabled={discountType !== 'item'}
              >
                Item Discount
              </button>
              <button 
                onClick={() => setDiscountType('category')}
                className={`discount-type-btn ${discountType === 'category' ? 'active' : ''}`}
                disabled={discountType !== 'category'}
              >
                Category Discount
              </button>
              <button 
                onClick={() => setDiscountType('loyalty')}
                className={`discount-type-btn ${discountType === 'loyalty' ? 'active' : ''}`}
                disabled={discountType !== 'loyalty'}
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
                background: enableDiscount ? '#4CAF50' : '#f44336', // Green when active, Red when inactive
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
                  color: enableDiscount ? '#4CAF50' : '#f44336', // Green when active, Red when inactive
                  fontSize: '9px', 
                  marginRight: '4px' 
                }} 
              />
              <span style={{ fontSize: '13px' }}>
                {enableDiscount ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Two column layout for form fields */}
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -8px' }}>
          {/* Left Column */}
          <div style={{ flex: '1 1 50%', minWidth: '280px', padding: '0 8px' }}>
            {/* Discount Name Dropdown */}
            <div className="dropdown-container" ref={dropdownRefs.discountName}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Discount Name</h3>
=======
          <div className="discount-toggle-container">
          <div 
            onClick={() => setEnableDiscount(!enableDiscount)}
            className={`toggle-switch ${enableDiscount ? 'active' : ''}`}
          >
            <div className="toggle-switch-handle" style={{ left: enableDiscount ? '20px' : '2px' }} />
          </div>
          <div className="toggle-label">
            <FaCircle className={`toggle-icon ${enableDiscount ? 'active' : 'inactive'}`} />
            <span>
              {enableDiscount ? 'Active' : 'Inactive'}
            </span>
          </div>
          </div>
        </div>

        <div className="discount-form-columns">
          <div className="discount-form-column">
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

<<<<<<< HEAD
            {/* Item Search Dropdown (shown for Item Discount) */}
            {discountType === 'item' && (
              <div className="dropdown-container" ref={dropdownRefs.item}>
                <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Select Item</h3>
=======
            {discountType === 'item' && (
              <div className="dropdown-container" ref={dropdownRefs.item}>
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

<<<<<<< HEAD
            {/* Category Dropdown */}
            {discountType === 'category' && (
              <div className="dropdown-container" ref={dropdownRefs.category}>
                <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Select Category</h3>
=======
            {discountType === 'category' && (
              <div className="dropdown-container" ref={dropdownRefs.category}>
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
  
<<<<<<< HEAD
            {/* Tier Dropdown - Always visible */}
            <div className="dropdown-container" ref={dropdownRefs.tier}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Select Tier</h3>
=======
            <div className="dropdown-container" ref={dropdownRefs.tier}>
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
  
<<<<<<< HEAD
          {/* Right Column */}
          <div style={{ flex: '1 1 50%', minWidth: '280px', padding: '0 8px' }}>
            {/* Percentage Dropdown */}
            <div className="dropdown-container" ref={dropdownRefs.percentage}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Percentage</h3>
=======
          <div className="discount-form-column">
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
  
<<<<<<< HEAD
            {/* Amount Dropdown */}
            <div className="dropdown-container" ref={dropdownRefs.amount}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Amount</h3>
=======
            <div className="dropdown-container" ref={dropdownRefs.amount}>
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
  
<<<<<<< HEAD
            {/* Duration Dropdown */}
            <div className="dropdown-container" ref={dropdownRefs.duration}>
              <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Duration</h3>
=======
            <div className="dropdown-container" ref={dropdownRefs.duration}>
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

export default DiscountEdit;