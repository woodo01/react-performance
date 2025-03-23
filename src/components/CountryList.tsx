import React from 'react';
import { Country } from '../types';
import CountryCard from './CountryCard';

interface CountryListProps {
  countries: Country[];
  visitedCountries: Set<string>;
  onToggleVisited: (countryCode: string) => void;
}

const CountryList: React.FC<CountryListProps> = React.memo(
  ({ countries, visitedCountries, onToggleVisited }) => {
    if (countries.length === 0) {
      return <div className="no-countries">No countries found</div>;
    }

    return (
      <div className="country-list">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            isVisited={visitedCountries.has(country.cca3)}
            onToggleVisited={onToggleVisited}
          />
        ))}
      </div>
    );
  }
);

CountryList.displayName = 'CountryList';

export default CountryList;
