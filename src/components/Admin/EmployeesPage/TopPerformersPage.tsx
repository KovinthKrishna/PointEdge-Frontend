import React, { useState, useEffect } from "react";
import "./styles/TopPerformers.css";
import { EmployeePerformance } from "../../../models/Performance";

// Sort types
type SortField = "orders" | "sales" | "workingHours";
type SortDirection = "asc" | "desc";

const TopPerformersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("sales"); // Default sort by sales
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [employees, setEmployees] = useState<EmployeePerformance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string>("all");

  // Fetch data from backend based on sort and filter options
  useEffect(() => {
    const fetchEmployeePerformance = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      
      try {
        let url = `http://localhost:8080/api/performance/top-performers?sortBy=${sortField || ''}&sortDirection=${sortDirection}`;
        
        // Add date range filters if applicable
        if (timeRange === "lastMonth") {
          const today = new Date();
          const lastMonth = new Date();
          lastMonth.setMonth(today.getMonth() - 1);
          
          url += `&startDate=${lastMonth.toISOString().split('T')[0]}&endDate=${today.toISOString().split('T')[0]}`;
        } else if (timeRange === "lastWeek") {
          const today = new Date();
          const lastWeek = new Date();
          lastWeek.setDate(today.getDate() - 7);
          
          url += `&startDate=${lastWeek.toISOString().split('T')[0]}&endDate=${today.toISOString().split('T')[0]}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Failed to fetch employee performance data");
        }
        
        const data = await response.json() as EmployeePerformance[];
        setEmployees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching data");
        console.error("Error fetching employee performance:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployeePerformance();
  }, [sortField, sortDirection, timeRange]);
  
  // Handle search submit
  const handleSearch = async (): Promise<void> => {
    if (!searchQuery.trim()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`http://localhost:8080/api/performance/search?query=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error("Failed to search employees");
      }
      
      const data = await response.json() as EmployeePerformance[];
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while searching");
      console.error("Error searching employees:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle sorting
  const handleSort = (field: SortField): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // Handle key press for search
  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="top-performers-container">
      <div className="top-performers-content">
        {/* Filters and Search */}
        <div className="filters-container">
          <div>
            <select
              className="select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastWeek">Last Week</option>
            </select>
          </div>
        </div>

        {/* Search Input */}
        <div className="search-container">
          <div className="input-group">
            <div className="input-left-element">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                  stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              className={`button button-primary ${loading ? 'loading-button' : ''}`}
              onClick={handleSearch}
              disabled={loading}
            >
              {loading && <div className="spinner spinner-small"></div>}
              Search
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="alert alert-error">
            <div className="alert-icon">⚠️</div>
            <div>{error}</div>
          </div>
        )}

        {/* Employee Performance Table */}
        <div className="table-container">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <table className="table">
              <thead>
               <tr>
                 <th style={{ width: "15%" }}>Employee ID</th>
                 <th style={{ width: "20%" }}>Employee NAME</th>
                 <th style={{ width: "15%" }}>Role</th>
                 <th 
                    style={{ width: "16%" }}
                    onClick={() => handleSort("orders")} 
                    className="sortable-header"
                 >
                 <div className="header-content">
                 Orders
                <div className="sort-icon">
                    {sortField === "orders" ? (
                      sortDirection === "asc" ? (
                      <span className="triangle-up"></span>
                      ) : (
                      <span className="triangle-down"></span>
                      )
                      ) : (
                      <span className="triangle-down inactive"></span>
                   )}
                  </div>
                 </div>
                </th>
                <th 
                   style={{ width: "18%" }}
                   onClick={() => handleSort("sales")} 
                    className="sortable-header"
                  >
                 <div className="header-content">
                    Sales
                 <div className="sort-icon">
                  {sortField === "sales" ? (
                    sortDirection === "asc" ? (
                     <span className="triangle-up"></span>
                    ) : (
                    <span className="triangle-down"></span>
                    )
                    ) : (
                    <span className="triangle-down inactive"></span>
                    )}
                  </div>
                 </div>
                </th>
                <th 
                  style={{ width: "16%" }}
                  onClick={() => handleSort("workingHours")} 
                  className="sortable-header"
                  >
                  <div className="header-content">
                    Working Hours
                   <div className="sort-icon">
                           {sortField === "workingHours" ? (
                     sortDirection === "asc" ? (
                      <span className="triangle-up"></span>
                      ) : (
                       <span className="triangle-down"></span>
                      )
                      ) : (
                        <span className="triangle-down inactive"></span>
                      )}
                   </div>
                  </div>
                </th>
              </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty-table-message">
                      No employees found
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>
                        <div className="employee-name-cell">
                          <div className="avatar">
                            {employee.avatar ? (
                              <img src={employee.avatar} alt={employee.name} />
                            ) : (
                              <div className="avatar-fallback">
                                {employee.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <span>{employee.name}</span>
                        </div>
                      </td>
                      <td>{employee.role}</td>
                      <td>{employee.orders} orders</td>
                      <td>{formatCurrency(employee.sales)}</td>
                      <td>{employee.workingHours}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopPerformersPage;