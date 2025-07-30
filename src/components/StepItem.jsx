import { useDispatch } from 'react-redux';
import { updateStepField, deleteStep } from '../redux/campaignSlice';

function StepItem({ step }) {
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    dispatch(updateStepField({ id: step.id, field, value }));
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold capitalize">{step.type} Step</h3>
        <button
          onClick={() => dispatch(deleteStep(step.id))}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          ❌ Remove
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-3">{step.description}</p>

      {/* Dynamic Fields */}
      {step.type === 'gift' && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Gift Name"
            value={step.giftName || ''}
            onChange={(e) => handleChange('giftName', e.target.value)}
            className="input-style"
          />
          <textarea
            placeholder="Gift Message"
            value={step.giftMessage || ''}
            onChange={(e) => handleChange('giftMessage', e.target.value)}
            className="input-style"
          />
        </div>
      )}

      {step.type === 'wait' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">Wait Time (in days):</label>
          <input
            type="number"
            min="1"
            value={step.waitDays || ''}
            onChange={(e) => handleChange('waitDays', e.target.value)}
            className="input-style"
          />
        </div>
      )}

      {step.type === 'condition' && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">User Behavior:</label>
          <select
            value={step.conditionType || ''}
            onChange={(e) => handleChange('conditionType', e.target.value)}
            className="input-style"
          >
            <option value="">-- Select Behavior --</option>
            <option value="open">Opened Email</option>
            <option value="click">Clicked Link</option>
            <option value="purchase">Made a Purchase</option>
            <option value="idle">No Activity</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default StepItem;
