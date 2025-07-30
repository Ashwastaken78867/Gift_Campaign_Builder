import { createSlice } from '@reduxjs/toolkit';

const stepsSlice = createSlice({
  name: 'campaign',
  initialState: {
    steps: JSON.parse(localStorage.getItem('steps')) || [],
  },
  reducers: {
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
    clearSteps: (state) => {
      state.steps = [];
      localStorage.setItem('steps', JSON.stringify(state.steps));
    },
    reorderSteps: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedStep] = state.steps.splice(fromIndex, 1);
      state.steps.splice(toIndex, 0, movedStep);
      localStorage.setItem('steps', JSON.stringify(state.steps));
    },
  },
});

export const {
  addStep,
  deleteStep,
  updateStepField,
  clearSteps,
  reorderSteps
} = stepsSlice.actions;

export default stepsSlice.reducer;
