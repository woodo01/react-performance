import React from 'react';
import PropTypes from 'prop-types';
import { SortOption, SortField, SortDirection } from '../types';

interface FilterControlsProps {
  regions: string[];
  selectedRegion: string;
  searchTerm: string;
  sortOption: SortOption;
  onRegionChange: (region: string) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (field: SortField, direction: SortDirection) => void;
}

const FilterControls: React.FC<FilterControlsProps> = React.memo(
  ({
    regions,
    selectedRegion,
    searchTerm,
    sortOption,
    onRegionChange,
    onSearchChange,
    onSortChange,
  }) => {
    const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onRegionChange(e.target.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    };

    const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onSortChange(e.target.value as SortField, sortOption.direction);
    };

    const handleSortDirectionChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      onSortChange(sortOption.field, e.target.value as SortDirection);
    };

    return (
      <div className="filter-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-selects">
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="region-select"
          >
            <option value="">Filter by Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <select
            value={sortOption.field}
            onChange={handleSortFieldChange}
            className="sort-field-select"
          >
            <option value="name">Sort by Name</option>
            <option value="population">Sort by Population</option>
          </select>

          <select
            value={sortOption.direction}
            onChange={handleSortDirectionChange}
            className="sort-direction-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    );
  }
);

FilterControls.propTypes = {
  regions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedRegion: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  sortOption: PropTypes.shape({
    field: PropTypes.oneOf(['name', 'population']).isRequired,
    direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
  }).isRequired,
  onRegionChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

FilterControls.displayName = 'FilterControls';

export default FilterControls;
