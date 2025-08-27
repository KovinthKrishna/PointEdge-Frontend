import React from "react";
import "./styles/TopPerformers.css";
import PerformanceSearch from "./PerformanceSearch";
import PerformanceTable from "./PerformanceTable";
import { useTopPerformers } from "../../../hooks/useTopPerformers";

const TopPerformersPage: React.FC = () => {
  const {
    employees,
    loading,
    errorMessage,
    searchQuery,
    sortField,
    sortDirection,
    timeRange,
    setSearchQuery,
    setTimeRange,
    handleSearch,
    handleSort,
    formatCurrency
  } = useTopPerformers();

  return (
    <div className="top-performers-container">
      <div className="top-performers-content">
        <PerformanceSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          loading={loading}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <PerformanceTable
          employees={employees}
          loading={loading}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
};

export default TopPerformersPage;