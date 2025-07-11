<<<<<<< HEAD
import React, { useState } from "react";
=======
import { useState } from "react";
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
import DiscountTabBar from "./DiscountTabBar";
import DiscountOptionsDashboard from "./DiscountOptionsDashborad";
import DiscountTableDashboard from "./DiscountTableDashborad";
import DiscountSequenceDashboard from "./DiscountSequenceDashborad";
import DiscountOptionsItem from "./DiscountOptionsItem";
import DiscountTableItem from "./DiscountTableItem";
import DiscountSequenceItem from "./DiscountSequenceItem";
import DiscountOptionsCategory from "./DiscountOptionsCategory";
import DiscountTableCategory from "./DiscountTableCategory";
import DiscountSequenceCategory from "./DiscountSequenceCategory";
import DiscountOptionsLoyalty from "./DiscountOptionsLoyalty";
import DiscountTableLoyalty from "./DiscountTableLoyalty";
import DiscountSequenceLoyalty from "./DiscountSequenceLoyalty";
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
            {!editingDiscountId && (
              <DiscountOptionsDashboard
                onReportClick={() => setShowReport(true)}
                onAddClick={() => setShowAddForm(true)} 
                discountCount={0}
              />
            )}
            <DiscountTableDashboard 
              onEditDiscount={(id) => setEditingDiscountId(id)}
            />
            {!editingDiscountId && <DiscountSequenceDashboard />}
          </>
        );
      case "item":
        return (
          <>
            <DiscountOptionsItem
<<<<<<< HEAD
              onReportClick={() => setShowReport(true)}
              onAddClick={() => setShowAddForm(true)}
=======
              onAddClick={() => setShowAddForm(true)} itemCount={0}            
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
            />
            <DiscountTableItem 
              onEditDiscount={(id) => setEditingDiscountId(id)}
            />
            <DiscountSequenceItem />
          </>
        );
      case "category":
        return (
          <>
            <DiscountOptionsCategory
<<<<<<< HEAD
              onReportClick={() => setShowReport(true)}
              onAddClick={() => setShowAddForm(true)}
            />
=======
              onAddClick={() => setShowAddForm(true)} categoryCount={0}          
             />
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
            <DiscountTableCategory 
              onEditDiscount={(id) => setEditingDiscountId(id)}
            />
            <DiscountSequenceCategory />
          </>
        );
      case "loyalty":
        return (
          <>
            <DiscountOptionsLoyalty
              onSettingsClick={() => setShowSettings(true)}
<<<<<<< HEAD
              onDeleteClick={() => console.log('Delete clicked')} 
=======
>>>>>>> e70935b045fedb4beb118d29bb1806d96cce68bc
              loyaltyCount={0}
              onAddClick={() => setShowAddForm(true)}
            />
            {!showSettings && (
              <>
                <DiscountTableLoyalty
                  onEditDiscount={(id) => setEditingDiscountId(id)}
                />
                <DiscountSequenceLoyalty />
              </>
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