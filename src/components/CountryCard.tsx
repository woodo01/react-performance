import React from 'react';
import { Country } from '../types';

interface CountryCardProps {
  country: Country;
  isVisited: boolean;
  onToggleVisited: (countryCode: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = React.memo(
  ({ country, isVisited, onToggleVisited }) => {
    const handleToggleVisited = () => {
      onToggleVisited(country.cca3);
    };

    return (
      <div
        className={`country-card ${isVisited ? 'visited' : ''}`}
        data-testid="country-card"
      >
        <div className="flag-container">
          <img
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className="country-flag"
          />
        </div>
        <div className="country-info">
          <h2>{country.name.common}</h2>
          <p>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <button
            className={`visit-button ${isVisited ? 'visited' : ''}`}
            onClick={handleToggleVisited}
          >
            {isVisited ? 'Visited' : 'Mark as Visited'}
          </button>
        </div>
      </div>
    );
  }
);

CountryCard.displayName = 'CountryCard';

export default CountryCard;
