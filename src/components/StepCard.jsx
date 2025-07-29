import { useDispatch } from 'react-redux';
import { removeStep } from '../redux/campaignSlice';

function StepCard({ step }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{step.type}</h2>
        <p className="text-sm text-gray-600">{step.description}</p>
      </div>
      <button
        onClick={() => dispatch(removeStep(step.id))}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}

export default StepCard;
