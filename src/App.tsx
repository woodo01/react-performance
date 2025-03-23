import { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import { fetchAllCountries } from './services/api';
import { Country, SortOption, Filters } from './types';
import CountryList from './components/CountryList';
import FilterControls from './components/FilterControls';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visitedCountries, setVisitedCountries] = useLocalStorage<string[]>(
    'visitedCountries',
    []
  );
  const [filters, setFilters] = useState<Filters>({
    region: '',
    search: '',
  });
  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'name',
    direction: 'asc',
  });

  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  // Extract unique regions for the dropdown
  const regions = useMemo(() => {
    const uniqueRegions = new Set(countries.map((country) => country.region));
    return Array.from(uniqueRegions).sort();
  }, [countries]);

  // Create a Set for faster lookups
  const visitedCountriesSet = useMemo(() => {
    return new Set(visitedCountries);
  }, [visitedCountries]);

  // Toggle country visited status
  const handleToggleVisited = useCallback(
    (countryCode: string) => {
      if (visitedCountriesSet.has(countryCode)) {
        setVisitedCountries(
          visitedCountries.filter((code) => code !== countryCode)
        );
      } else {
        setVisitedCountries([...visitedCountries, countryCode]);
      }
    },
    [visitedCountries, visitedCountriesSet, setVisitedCountries]
  );

  // Handle filter and sort changes
  const handleRegionChange = useCallback((region: string) => {
    setFilters((prev) => ({ ...prev, region }));
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const handleSortChange = useCallback(
    (field: 'name' | 'population', direction: 'asc' | 'desc') => {
      setSortOption({ field, direction });
    },
    []
  );

  // Filter and sort countries based on user selections
  const filteredAndSortedCountries = useMemo(() => {
    let result = [...countries];

    // Filter by region
    if (filters.region) {
      result = result.filter((country) => country.region === filters.region);
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
      );
    }

    // Sort countries
    result.sort((a, b) => {
      let comparison = 0;

      if (sortOption.field === 'name') {
        comparison = a.name.common.localeCompare(b.name.common);
      } else if (sortOption.field === 'population') {
        comparison = a.population - b.population;
      }

      return sortOption.direction === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [countries, filters.region, filters.search, sortOption]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Countries of the World</h1>
      </header>

      <main className="app-main">
        <FilterControls
          regions={regions}
          selectedRegion={filters.region}
          searchTerm={filters.search}
          sortOption={sortOption}
          onRegionChange={handleRegionChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />

        {loading ? (
          <div className="loading">Loading countries...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <CountryList
            countries={filteredAndSortedCountries}
            visitedCountries={visitedCountriesSet}
            onToggleVisited={handleToggleVisited}
          />
        )}
      </main>
    </div>
  );
}

export default App;
