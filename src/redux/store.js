import { configureStore } from '@reduxjs/toolkit';
import campaignReducer from './campaignSlice';
import stepsReducer from './stepsSlice'; // ✅ import stepsSlice

// Load state from localStorage
const loadState = () => {
  try {
    const serialized = localStorage.getItem('steps');
    if (!serialized) return undefined;
    return {
      steps: { steps: JSON.parse(serialized) }, // ✅ load from steps key
    };
  } catch {
    return undefined;
  }
};

// Save to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem('steps', JSON.stringify(state.steps.steps)); // ✅ save stepsSlice state
  } catch (err) {
    console.error('LocalStorage save error:', err);
  }
};

const store = configureStore({
  reducer: {
    campaign: campaignReducer,
    steps: stepsReducer, // ✅ add this line
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
