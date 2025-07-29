import { useDispatch, useSelector } from 'react-redux';
import { addStep, clearSteps } from '../redux/campaignSlice';
import StepCard from './StepCard';
import { nanoid } from '@reduxjs/toolkit';

function StepList() {
  const steps = useSelector((state) => state.campaign.steps);
  const dispatch = useDispatch();

  const handleAddStep = (type) => {
    const descriptions = {
      gift: 'Send a personalized gift to the user.',
      wait: 'Wait for a specific time before next step.',
      condition: 'Check user action like open/click.',
    };

    dispatch(addStep({
      id: nanoid(),
      type,
      description: descriptions[type],
    }));
  };

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleAddStep('gift')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ➕ Send Gift
        </button>
        <button
          onClick={() => handleAddStep('wait')}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          ⏱️ Wait
        </button>
        <button
          onClick={() => handleAddStep('condition')}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          🔀 Condition
        </button>
        <button
          onClick={() => dispatch(clearSteps())}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          🧹 Clear All
        </button>
      </div>

      {steps.length === 0 && (
        <p className="text-gray-500 text-sm">No steps added yet.</p>
      )}

      {steps.map((step) => (
        <StepCard key={step.id} step={step} />
      ))}
    </div>
  );
}

export default StepList;
