
// redux/stepsSlice.jsx
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const loadSteps = () => {
  try {
    const stored = localStorage.getItem('steps');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveSteps = (steps) => {
  localStorage.setItem('steps', JSON.stringify(steps));
};

const initialState = {
  steps: loadSteps(),
};

const stepsSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    addStep: (state, action) => {
      const id = nanoid();
      const { type } = action.payload;

      let newStep = {
        id,
        type,
        description: '',
      };

      if (type === 'gift') {
        newStep.data = {
          itemName: '',
          recipient: '',
        };
        newStep.description = 'Send a personalized email to the user.';
      }

      if (type === 'wait') {
        newStep.data = {
          duration: '',
        };
        newStep.description = 'Wait for a specific time before next step.';
      }

      if (type === 'condition') {
        newStep.data = {
          conditionType: '',
          trueBranch: [],
          falseBranch: [],
        };
        newStep.description = 'Check user action like open/click.';
      }

      state.steps.push(newStep);
      saveSteps(state.steps);
    },

    deleteStep: (state, action) => {
      const id = action.payload;
      state.steps = state.steps.filter((step) => step.id !== id);
      saveSteps(state.steps);
    },

    updateStepField: (state, action) => {
      const { id, field, value } = action.payload;
      const step = state.steps.find((s) => s.id === id);
      if (step) {
        step.data[field] = value;
        saveSteps(state.steps);
      }
    },

    updateConditionType: (state, action) => {
      const { id, conditionType } = action.payload;
      const step = state.steps.find((s) => s.id === id);
      if (step && step.type === 'condition') {
        step.data.conditionType = conditionType;
        saveSteps(state.steps);
      }
    },

    addToBranch: (state, action) => {
      const { stepId, branchType, type } = action.payload;
      const parentStep = state.steps.find((s) => s.id === stepId);

      if (parentStep && parentStep.type === 'condition') {
        const newStep = {
          id: nanoid(),
          type,
          data: {},
        };

        if (type === 'gift') {
          newStep.data = { itemName: '', recipient: '' };
        } else if (type === 'wait') {
          newStep.data = { duration: '' };
        }

        parentStep.data[branchType].push(newStep);
        saveSteps(state.steps);
      }
    },

    clearSteps: (state) => {
      state.steps = [];
      saveSteps(state.steps);
    },

    reorderSteps: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedStep] = state.steps.splice(fromIndex, 1);
      state.steps.splice(toIndex, 0, movedStep);
      saveSteps(state.steps);
    },
  },
});

export const {
  addStep,
  deleteStep,
  updateStepField,
  updateConditionType,
  addToBranch,
  clearSteps,
  reorderSteps,
} = stepsSlice.actions;

// 🔍 Validation helpers
const isStepValid = (step) => {
  if (!step || !step.type || !step.data) return false;

  if (step.type === 'gift') {
    return (
      typeof step.data.itemName === 'string' &&
      step.data.itemName.trim() !== '' &&
      typeof step.data.recipient === 'string' &&
      step.data.recipient.trim() !== ''
    );
  }

  if (step.type === 'wait') {
    return (
      step.data.duration !== undefined &&
      step.data.duration !== '' &&
      !isNaN(step.data.duration) &&
      Number(step.data.duration) > 0
    );
  }

  if (step.type === 'condition') {
    const { conditionType, trueBranch, falseBranch } = step.data;

    if (
      typeof conditionType !== 'string' ||
      !Array.isArray(trueBranch) ||
      !Array.isArray(falseBranch) ||
      trueBranch.length === 0 ||
      falseBranch.length === 0
    ) {
      return false;
    }

    const trueValid = trueBranch.every(isStepValid);
    const falseValid = falseBranch.every(isStepValid);
    return trueValid && falseValid;
  }

  return true;
};

// ✅ Selector used in ExportButton
export const areStepsValid = (state) =>
  state.campaign.steps.length > 0 && state.campaign.steps.every(isStepValid);

export default stepsSlice.reducer;
