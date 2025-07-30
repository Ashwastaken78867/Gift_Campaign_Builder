import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  createdBy: '',
  createdAt: null,
  steps: JSON.parse(localStorage.getItem('steps')) || [],
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCampaignMetadata: (state, action) => {
      const { name, createdBy } = action.payload;
      state.name = name;
      state.createdBy = createdBy;
      if (!state.createdAt) {
        state.createdAt = new Date().toISOString();
      }
    },
    addStep: (state, action) => {
      state.steps.push(action.payload);
      localStorage.setItem('steps', JSON.stringify(state.steps));
    },
    deleteStep: (state, action) => {
      state.steps = state.steps.filter(step => step.id !== action.payload);
      localStorage.setItem('steps', JSON.stringify(state.steps));
    },
    updateStepField: (state, action) => {
      const { id, field, value } = action.payload;
      const step = state.steps.find(s => s.id === id);
      if (step) {
        step[field] = value;
        localStorage.setItem('steps', JSON.stringify(state.steps));
      }
    },
    reorderSteps: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedStep] = state.steps.splice(fromIndex, 1);
      state.steps.splice(toIndex, 0, movedStep);
      localStorage.setItem('steps', JSON.stringify(state.steps));
    },
    clearSteps: (state) => {
      state.steps = [];
      localStorage.setItem('steps', JSON.stringify(state.steps));
    },
  },
});

export const {
  setCampaignMetadata,
  addStep,
  deleteStep,
  updateStepField,
  reorderSteps,
  clearSteps,
} = campaignSlice.actions;

export default campaignSlice.reducer;