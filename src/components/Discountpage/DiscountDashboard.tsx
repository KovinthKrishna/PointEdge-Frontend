import { useState } from "react";
import DiscountTabBar from "./DiscountTabBar";
import DiscountOptionsDashboard from "./DiscountOptionsDashborad";
import DiscountTableDashboard from "./DiscountTableDashborad";
import DiscountOptionsItem from "./DiscountOptionsItem";
import DiscountTableItem from "./DiscountTableItem";
import DiscountOptionsCategory from "./DiscountOptionsCategory";
import DiscountTableCategory from "./DiscountTableCategory";
import DiscountOptionsLoyalty from "./DiscountOptionsLoyalty";
import DiscountTableLoyalty from "./DiscountTableLoyalty";
import DiscountReport from "./DiscountReport";
import DiscountAdd from "./DiscountAdd";
import DiscountLoyaltySettings from "./DiscountLoyaltySettings";
import DiscountEdit from "./DiscountEdit";

const DiscountDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showReport, setShowReport] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingDiscountId, setEditingDiscountId] = useState<number | null>(null);
  
  const handleBackFromEdit = () => {
    setEditingDiscountId(null);
  };

  const renderTabContent = () => {
    if (showSettings) {
      return <DiscountLoyaltySettings onBack={() => setShowSettings(false)} />;
    }
    if (showAddForm) {
      return <DiscountAdd onBack={() => setShowAddForm(false)} />;
    }
    if (showReport) {
      return <DiscountReport onBack={() => setShowReport(false)} />;
    }
    if (editingDiscountId) {
      return <DiscountEdit onBack={handleBackFromEdit} discountId={editingDiscountId} />;
    }
    
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <DiscountOptionsDashboard
              onReportClick={() => setShowReport(true)}
              onAddClick={() => setShowAddForm(true)} 
              discountCount={0}
            />
            <DiscountTableDashboard 
              onEditDiscount={(id) => setEditingDiscountId(id)}
            />
          </>
        );
      case "item":
        return (
          <>
            <DiscountOptionsItem
              onAddClick={() => setShowAddForm(true)} itemCount={0}            
            />
            <DiscountTableItem 
              onEditDiscount={(id) => setEditingDiscountId(id)}
            />
          </>
        );
      case "category":
        return (
          <>
            <DiscountOptionsCategory
              onAddClick={() => setShowAddForm(true)} categoryCount={0}          
             />
            <DiscountTableCategory 
              onEditDiscount={(id) => setEditingDiscountId(id)}
            />
          </>
        );
      case "loyalty":
        return (
          <>
            <DiscountOptionsLoyalty
              onSettingsClick={() => setShowSettings(true)}
              loyaltyCount={0}
              onAddClick={() => setShowAddForm(true)}
            />
            {!showSettings && (
              <DiscountTableLoyalty
                onEditDiscount={(id) => setEditingDiscountId(id)}
              />
            )}
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      <DiscountTabBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setShowReport(false);
          setShowAddForm(false);
          setShowSettings(false);
          setEditingDiscountId(null);
        }}
      />
      {renderTabContent()}
    </>
  );
};

export default DiscountDashboard;