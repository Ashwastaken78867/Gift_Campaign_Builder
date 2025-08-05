import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  steps: [],
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    addStep: (state, action) => {
      const newStep = {
        id: nanoid(),
        type: action.payload.type,
        data: action.payload.data || {},
      };
      state.steps.push(newStep);
    },
    deleteStep: (state, action) => {
      state.steps = state.steps.filter((step) => step.id !== action.payload);
    },
    updateStepField: (state, action) => {
      const { id, field, value } = action.payload;
      const step = state.steps.find((step) => step.id === id);
      if (step) {
        step.data[field] = value;
      }
    },
    clearSteps: (state) => {
      state.steps = [];
    },
  },
});

export const { addStep, deleteStep, updateStepField, clearSteps } = campaignSlice.actions;

export default campaignSlice.reducer;

export const reorderSteps = (sourceIndex, destinationIndex) => {
  return (dispatch, getState) => {
    const steps = [...getState().campaign.steps];
    const [removed] = steps.splice(sourceIndex, 1);
    steps.splice(destinationIndex, 0, removed);
    dispatch(setSteps(steps));
  };
};
