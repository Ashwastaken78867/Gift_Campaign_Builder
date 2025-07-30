import { useDispatch } from 'react-redux';
import { deleteStep } from '../redux/campaignSlice'; // ✅ fixed
import StepItem from './StepItem';

function StepCard({ step }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold capitalize">{step.type}</h2>
          <p className="text-sm text-gray-600">{step.description}</p>
        </div>
        <button
          onClick={() => dispatch(deleteStep(step.id))}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>

      {/* 👇 Render dynamic fields */}
      <div className="mt-4">
        <StepItem step={step} />
      </div>
    </div>
  );
}

export default StepCard;