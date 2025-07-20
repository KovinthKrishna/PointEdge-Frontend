import React from "react";
import { TimeRange } from "../../../hooks/useTopPerformers";

interface PerformanceSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => Promise<void>;
  loading: boolean;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}

const PerformanceSearch: React.FC<PerformanceSearchProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = (): void => {
    setSearchQuery("");
    // Trigger search with empty query to reload all data
    setTimeout(() => handleSearch(), 0);
  };

  return (
    <>
      {/* Filters and Search */}
      

      {/* Search Input */}
      <div className="search-container">
        <div className="input-group">
          <div className="input-left-element">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#A0AEC0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            className="input"
            placeholder="Search by name, id, or others..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="button-group">
          <button
            className={`button button-primary ${loading ? "loading-button" : ""}`}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading && <div className="spinner spinner-small"></div>}
            Search
          </button>
          {searchQuery && (
            <button
              className="button button-secondary"
              onClick={clearSearch}
              disabled={loading}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PerformanceSearch;