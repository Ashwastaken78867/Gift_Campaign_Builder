import { createSlice } from '@reduxjs/toolkit';

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    steps: [],
  },
  reducers: {
    addStep: (state, action) => {
      state.steps.push(action.payload);
    },
    removeStep: (state, action) => {
      state.steps = state.steps.filter((step) => step.id !== action.payload);
    },
    clearSteps: (state) => {
      state.steps = [];
    },
  },
});

export const { addStep, removeStep, clearSteps } = campaignSlice.actions;
export default campaignSlice.reducer;
