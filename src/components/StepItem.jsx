import { useDispatch } from 'react-redux';
import { updateStepField } from '../redux/stepsSlice';

function StepItem({ step }) {
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    dispatch(updateStepField({ id: step.id, field, value }));
  };

  const inputClass =
    'w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400';

  if (step.type === 'gift') {
    return (
      <div className="space-y-2 mt-2">
        <input
          type="text"
          placeholder="Subject:"
          value={step.data?.itemName || ''}
          onChange={(e) => handleChange('itemName', e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Description:"
          value={step.data?.recipient || ''}
          onChange={(e) => handleChange('recipient', e.target.value)}
          className={inputClass}
        />
      </div>
    );
  }

  if (step.type === 'wait') {
    return (
      <div className="mt-2 space-y-1">
        <label className="text-xs text-gray-600">Wait (in days)</label>
        <input
          type="number"
          min="1"
          value={step.data?.duration || ''}
          onChange={(e) => handleChange('duration', e.target.value)}
          className={inputClass}
        />
      </div>
    );
  }

  if (step.type === 'condition') {
    return (
      <div className="mt-2 space-y-1">
        <label className="text-xs text-gray-600">Trigger Condition</label>
        <select
          value={step.data?.conditionType || ''}
          onChange={(e) => handleChange('conditionType', e.target.value)}
          className={inputClass}
        >
          <option value="">-- Select --</option>
          <option value="open">📬 Opened Email</option>
          <option value="click">🔗 Clicked Link</option>
          <option value="purchase">🛒 Made a Purchase</option>
          <option value="idle">😴 No Activity</option>
        </select>
      </div>
    );
  }

  return null;
}

export default StepItem;
