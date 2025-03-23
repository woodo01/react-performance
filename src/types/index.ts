export interface Country {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  subregion?: string;
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  cca3: string; // Unique identifier for the country
}

export type SortField = 'name' | 'population';
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}

export interface Filters {
  region: string;
  search: string;
}
