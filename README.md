# React Performance - Countries App

This application displays countries from the [REST Countries API](https://restcountries.com/), with features for filtering, sorting, and marking countries as visited.

## Features

- Fetch and display country data, including name, population, region, and flag
- Filter countries by region using a dropdown menu
- Search countries by name using a search bar
- Sort countries by population or name (ascending/descending)
- Mark countries as visited, with persistence using local storage

## Performance Optimizations

The application is optimized for performance using React's memoization features:

- **useMemo**: Used to memoize the filtered, searched, and sorted list of countries to avoid recalculating on every render
- **useCallback**: Used to memoize event handler functions for filtering, searching, and sorting
- **React.memo**: Applied to components like CountryCard, CountryList, and FilterControls to prevent unnecessary re-renders
- **Proper key usage**: Unique keys are assigned to list items for efficient reconciliation

## Technology Stack

- React 19
- TypeScript
- Vite
- Axios for API requests
- ESLint and Prettier for code quality
- Husky for pre-commit hooks

## Performance Profiling Results

### Initial Performance (Before Optimization)

[Insert screenshots and descriptions of initial performance measurements here]

### Optimized Performance (After Applying Memoization)

[Insert screenshots and descriptions of optimized performance measurements here]

## Setup and Running the Project

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## Code Structure

- `src/components/`: React components
- `src/hooks/`: Custom React hooks
- `src/services/`: API and other services
- `src/types/`: TypeScript type definitions
