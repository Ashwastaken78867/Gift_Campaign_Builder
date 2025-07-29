import { configureStore } from '@reduxjs/toolkit';
import campaignReducer from './campaignSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('campaignSteps');
    if (serializedState === null) return undefined;
    return { campaign: { steps: JSON.parse(serializedState) } };
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.campaign.steps);
    localStorage.setItem('campaignSteps', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const store = configureStore({
  reducer: {
    campaign: campaignReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
