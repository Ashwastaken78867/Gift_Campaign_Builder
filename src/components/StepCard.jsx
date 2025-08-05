import { useDispatch } from 'react-redux';
import { deleteStep } from '../redux/stepsSlice';
import StepItem from './StepItem';

function StepCard({ step, isActive, onClick }) {
  const dispatch = useDispatch();

  const handleCardClick = (e) => {
    const tag = e.target.tagName.toLowerCase();
    const avoidTags = ['input', 'textarea', 'select', 'button', 'svg', 'path', 'label'];
    if (avoidTags.includes(tag)) return;
    onClick();
  };

  return (
    <div
      onClick={handleCardClick}
      className={`border rounded-md bg-white px-4 py-3 cursor-pointer transition 
        ${isActive ? 'shadow-md border-blue-400' : 'hover:shadow'}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm font-semibold text-gray-800 capitalize">
            {step.type} Step
          </h2>
          <p className="text-xs text-gray-500">{step.description || ''}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteStep(step.id));
          }}
          className="text-red-600 text-xs px-2 py-1 rounded hover:bg-red-100 transition"
        >
          ✖
        </button>
      </div>

      {isActive && (
        <div className="mt-3">
          <StepItem step={step} />
        </div>
      )}
    </div>
  );
}

export default StepCard;
