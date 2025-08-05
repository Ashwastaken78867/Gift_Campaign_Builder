import { useDispatch } from 'react-redux';
import { addStep, clearSteps } from '../redux/campaignSlice';
import { nanoid } from '@reduxjs/toolkit';

function Sidebar() {
  const dispatch = useDispatch();

  const handleAddStep = (type) => {
    const descriptions = {
      gift: 'Send a personalized email to the user.',
      wait: 'Wait for a specific time before next step.',
      condition: 'Check user action like open/click.',
    };

    const newStep = {
      id: nanoid(),
      type,
      description: descriptions[type],
    };

    dispatch(addStep(newStep));
  };

  return (
    <aside className="w-64 h-screen bg-white text-gray-900 p-6 space-y-6 shadow-md border-r flex flex-col">
      <div>
        <h2 className="text-xl font-semibold">Add Email Step</h2>
        <p className="text-sm text-gray-600">Choose an action to add to your flow.</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => handleAddStep('gift')}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          📧 Send Email
        </button>

        <button
          onClick={() => handleAddStep('wait')}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition"
        >
          ⏱️ Wait Step
        </button>

        <button
          onClick={() => handleAddStep('condition')}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
        >
          🔀 Condition
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200 mt-auto">
        <button
          onClick={() => dispatch(clearSteps())}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          🧹 Clear All Steps
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
