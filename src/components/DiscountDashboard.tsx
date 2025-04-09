import React, { useState } from "react";
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

const DiscountDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showReport, setShowReport] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
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
    
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <DiscountOptionsDashboard
              onReportClick={() => setShowReport(true)}
              onAddClick={() => setShowAddForm(true)}
            />
            <DiscountTableDashboard />
            <DiscountSequenceDashboard />
          </>
        );
      case "item":
        return (
          <>
            <DiscountOptionsItem
              onReportClick={() => setShowReport(true)}
              onAddClick={() => setShowAddForm(true)}
            />
            <DiscountTableItem />
            <DiscountSequenceItem />
          </>
        );
      case "category":
        return (
          <>
            <DiscountOptionsCategory
              onReportClick={() => setShowReport(true)}
              onAddClick={() => setShowAddForm(true)}
            />
            <DiscountTableCategory />
            <DiscountSequenceCategory />
          </>
        );
      case "loyalty":
        return (
          <>
            <DiscountOptionsLoyalty
              onSettingsClick={() => setShowSettings(true)}
              onDeleteClick={() => console.log('Delete clicked')}
              // onCustomersClick={() => console.log('Customers button clicked')}
            />
            {!showSettings && (
              <>
                <DiscountTableLoyalty />
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
        }}
      />
      {renderTabContent()}
    </>
  );
};

export default DiscountDashboard;