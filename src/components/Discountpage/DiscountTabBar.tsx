import React from 'react';

interface DiscountTabBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const DiscountTabBar: React.FC<DiscountTabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'item', label: 'Item Discounts' },
    { id: 'category', label: 'Category Discounts' },
    { id: 'loyalty', label: 'Loyalty Discounts' }
  ];

  const styles = {
    tabsContainer: {
      display: 'flex',
      borderBottom: '12px solid #003049',
      borderRight: '12px solid #003049',
      width: '100%',
      paddingTop: '1rem', 
      height: '5.5rem'
    },
    tab: {
      padding: '0.75rem 2rem',
      fontWeight: 500,
      color: '#000',
      backgroundColor: '#FAFAFA',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.2s ease',
      height: '100%',
      boxSizing: 'border-box'
    },
    activeTab: {
      backgroundColor: '#003049',
      color: '#fff',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px'
    },
    hoverTab: {
      ':hover': {
        backgroundColor: '#f7fafc'
      }
    }
  };

  return (
    <div style={styles.tabsContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            className={`
              px-4 py-2 font-medium 
              ${isActive ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-gray-100'}
              border-none cursor-pointer outline-none transition-all duration-200
            `}
            style={{
              ...styles.tab,
              ...(isActive ? styles.activeTab : {}),
              ...(!isActive ? { ':hover': styles.hoverTab[':hover'] } : {})
            } as React.CSSProperties}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default DiscountTabBar;