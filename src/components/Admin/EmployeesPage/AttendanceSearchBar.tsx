import React from 'react';

interface AttendanceSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => Promise<void>;
  loading: boolean;
}

const AttendanceSearchBar: React.FC<AttendanceSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading
}) => {
 
  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex mb-6 gap-4">
      <div className="input-group">
        <div className="input-left-element">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
              stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <input
          className="input input-bg-white input-with-icon"
          placeholder="Search by name, id, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="flex gap-4">
         <button 
          className={`button button-primary ${loading ? 'loading-button' : ''}`}
          onClick={handleSearch}
          disabled={loading}
           >
          {loading && <div className="spinner spinner-small"></div>}
          Search
        </button>
      </div>
    </div>
  );
};

export default AttendanceSearchBar;