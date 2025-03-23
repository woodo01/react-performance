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

The non-optimized version of the application showed significant performance issues during user interactions:

- **Commit Duration:** 3.01 ms
- **Render Duration:** 15.5 ms
- **Flame Graph:**

![Initial Flame Graph](./screenshots/Screenshot\ 2025-03-23\ at\ 22.18.56.png)
![Initial Flame Graph](./screenshots/Screenshot\ 2025-03-23\ at\ 22.19.57.png)

- **Ranked Chart:**

![Initial Ranked Chart](./screenshots/Screenshot\ 2025-03-23\ at\ 22.19.13.png)

- **Interactions Causing Renders:**
  - Changing sort criteria caused all CountryCard components to re-render despite their props not changing
  - Typing in the search field triggered multiple re-renders of all components
  - Region filtering caused unnecessary re-renders of unaffected components
  - Marking a country as visited re-rendered all country cards, not just the affected one

### Optimized Performance (After Applying Memoization)

After implementing the performance optimizations, the application shows dramatically improved performance:

- **Commit Duration:** 2.4 ms (Improvement: 20%)
- **Render Duration:** 1.7 ms (Improvement: 912%)
- **Flame Graph:**

![Optimized Flame Graph](./screenshots/Screenshot\ 2025-03-23\ at\ 22.21.59.png)
![Optimized Flame Graph](./screenshots/Screenshot\ 2025-03-23\ at\ 22.22.26.png)

- **Ranked Chart:**

![Optimized Ranked Chart](./screenshots/Screenshot\ 2025-03-23\ at\ 22.22.08.png)

- **Interactions Causing Renders:**
  - Sort operations now only update the necessary components
  - Search operations only cause re-renders when the filtered results change
  - Marking a country as visited only re-renders the specific card component
  - Region filtering prevents re-renders of components that don't need to change

### Key Performance Improvements

- **useMemo for Data Processing**: The most significant improvement came from memoizing the filtered and sorted country list. In the non-optimized version, every state change would trigger a full recalculation of the filtered and sorted list, which is an expensive operation with hundreds of country objects. After optimization, this calculation only happens when the relevant dependencies change, resulting in the dramatic 912% improvement in render duration.

- **React.memo for Component Memoization**: Wrapping components like CountryCard with React.memo prevented unnecessary re-renders when parent components change but the card's props remain the same. This is particularly important for the CountryList component, where changing a single country's "visited" status would previously cause all country cards to re-render.

- **useCallback for Stable Function References**: By memoizing the event handler functions, we prevented unnecessary re-renders of child components that receive these functions as props. Without useCallback, new function references would be created on every render, causing child components to detect prop changes and re-render needlessly.

- **Most Improved Components**: 
  - CountryCard showed the most dramatic improvement, as it stopped re-rendering when unrelated cards were updated
  - FilterControls benefited greatly from stable callback references
  - The overall application filtering and sorting logic became much more efficient by only recalculating when necessary

The flame graphs clearly show that after optimization, the render tree becomes much simpler and shallower during interactions, with fewer components being affected by any given state change. The ranked chart confirms that individual component render times are significantly reduced.

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
