import React from "react";
import { SortField, SortDirection } from "../../../hooks/useTopPerformers";

interface PerformanceSortingProps {
  title: string;
  field: SortField;
  currentSortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  width?: string;
}

const PerformanceSorting: React.FC<PerformanceSortingProps> = ({
  title,
  field,
  currentSortField,
  sortDirection,
  onSort,
  width,
}) => {
  // Toggle sort direction: if already sorted by this field, toggle direction; else set field and default to descending
  const handleSort = () => {
    onSort(field);
  };

  return (
    <th
      style={{ width: width }}
      onClick={handleSort}
      className="sortable-header"
    >
      <div className="header-content">
        {title}
        <div className="sort-icon">
          {currentSortField === field ? (
            sortDirection === "desc" ? (
              <span className="triangle-down active" title="Sorted descending"></span>
            ) : (
              <span className="triangle-up active" title="Sorted ascending"></span>
            )
          ) : (
            <span className="triangle-down inactive" title="Click to sort descending"></span>
          )}
        </div>
      </div>
    </th>
  );
};

export default PerformanceSorting;