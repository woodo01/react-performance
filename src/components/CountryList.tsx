import React from 'react';
import PropTypes from 'prop-types';
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

CountryList.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.shape({
        common: PropTypes.string.isRequired,
        official: PropTypes.string.isRequired,
      }).isRequired,
      population: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired,
      flags: PropTypes.shape({
        png: PropTypes.string.isRequired,
        svg: PropTypes.string.isRequired,
        alt: PropTypes.string,
      }).isRequired,
      cca3: PropTypes.string.isRequired,
    })
  ).isRequired,
  visitedCountries: PropTypes.instanceOf(Set).isRequired,
  onToggleVisited: PropTypes.func.isRequired,
};

CountryList.displayName = 'CountryList';

export default CountryList;
