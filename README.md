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

To capture the initial performance, you'll need to temporarily remove the performance optimizations:
1. Remove React.memo() wrapping from all components
2. Remove useMemo() calls throughout the app
3. Remove useCallback() for event handlers

Then use the React DevTools Profiler to record interactions such as:
- Sorting countries by name or population
- Filtering countries by region
- Searching for a specific country

Record the following metrics:
- **Commit Duration:** 3.01 ms
- **Render Duration:** 15.5 ms
- **Flame Graph:**

![Initial Flame Graph](./screenshots/Screenshot\ 2025-03-23\ at\ 22.18.56.png)
![Initial Flame Graph](./screenshots/Screenshot\ 2025-03-23\ at\ 22.19.57.png)

- **Ranked Chart:**

![Initial Ranked Chart](./screenshots/Screenshot\ 2025-03-23\ at\ 22.19.13.png)

- **Interactions Causing Renders:**
  - [List interactions and components that re-rendered unnecessarily]

### Optimized Performance (After Applying Memoization)

After re-implementing all the optimizations (React.memo, useMemo, useCallback), record the same interactions and compare:

- **Commit Duration:** 2.4 ms (Improvement: 125%)
- **Render Duration:** 1.7 ms (Improvement: 912%)
- **Flame Graph:**

![Optimized Flame Graph](./screenshots/Screenshot\ 2025-03-23\ at\ 22.21.59.png)
![Optimized Flame Graph](./screenshots/Screenshot\ 2025-03-23\ at\ 22.22.26.png)

- **Ranked Chart:**

![Optimized Ranked Chart](./screenshots/Screenshot\ 2025-03-23\ at\ 22.22.08.png)

- **Interactions Causing Renders:**
  - [List interactions and components that now avoid unnecessary re-renders]

### Key Performance Improvements

- [Describe how useMemo helped avoid expensive recalculations]
- [Describe how React.memo prevented unnecessary re-renders]
- [Describe how useCallback stabilized event handler references]
- [Note any specific components that benefited most from the optimizations]

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

## Profiling Process

To profile the application performance:

1. Install React Developer Tools browser extension
2. Run the app in development mode
3. Open browser developer tools and navigate to the "Profiler" tab in React DevTools
4. Click the record button (circle)
5. Perform interactions (sorting, filtering, etc.)
6. Stop recording
7. Analyze the results in Flame Graph and Ranked Chart views

## Code Structure

- `src/components/`: React components
- `src/hooks/`: Custom React hooks
- `src/services/`: API and other services
- `src/types/`: TypeScript type definitions
