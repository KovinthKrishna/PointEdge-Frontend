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
  return (
    <th
      style={{ width: width }}
      onClick={() => onSort(field)}
      className="sortable-header"
    >
      <div className="header-content">
        {title}
        <div className="sort-icon">
          {currentSortField === field ? (
            sortDirection === "asc" ? (
              <span className="triangle-up"></span>
            ) : (
              <span className="triangle-down"></span>
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