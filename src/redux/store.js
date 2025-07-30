import { configureStore } from '@reduxjs/toolkit';
import campaignReducer from './campaignSlice';

// Load state from localStorage
const loadState = () => {
  try {
    const serialized = localStorage.getItem('campaignSteps');
    if (!serialized) return undefined;
    return { campaign: { steps: JSON.parse(serialized) } };
  } catch {
    return undefined;
  }
};

// Save to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem('campaignSteps', JSON.stringify(state.campaign.steps));
  } catch (err) {
    console.error('LocalStorage save error:', err);
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