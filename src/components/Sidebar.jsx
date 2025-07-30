// components/Sidebar.jsx
import { useDispatch } from 'react-redux';
import { addStep, clearSteps } from '../redux/campaignSlice';
import { nanoid } from '@reduxjs/toolkit';

function Sidebar() {
  const dispatch = useDispatch();

  const handleAddStep = (type) => {
    const descriptions = {
      gift: 'Send a personalized gift to the user.',
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
    <div className="bg-white rounded-xl p-4 shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Add Step</h2>
      <button onClick={() => handleAddStep('gift')} className="block w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">➕ Send Gift</button>
      <button onClick={() => handleAddStep('wait')} className="block w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">⏱️ Wait</button>
      <button onClick={() => handleAddStep('condition')} className="block w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">🔀 Condition</button>
      <button onClick={() => dispatch(clearSteps())} className="block w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">🧹 Clear All</button>
    </div>
  );
}

export default Sidebar;
