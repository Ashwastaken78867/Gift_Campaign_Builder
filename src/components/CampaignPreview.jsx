// src/components/CampaignPreview.jsx
import { useSelector } from 'react-redux';

function CampaignPreview() {
  const steps = useSelector((state) => state.campaign.steps);

  if (!steps.length) {
    return (
      <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 text-gray-500">
        No steps added yet.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border">
      <h2 className="text-xl font-semibold mb-4">📋 Campaign Preview</h2>

      <ol className="space-y-3 list-decimal list-inside">
        {steps.map((step, index) => (
          <li key={step.id} className="bg-gray-50 p-3 rounded-lg border">
            <div className="text-sm text-gray-700">
              <strong className="capitalize">{step.type}</strong> Step
            </div>

            <div className="text-sm text-gray-600 mt-1">
              {step.type === 'gift' && (
                <>
                  🎁 <strong>{step.giftName || 'Unnamed Gift'}</strong> — {step.giftMessage || 'No message'}
                </>
              )}
              {step.type === 'wait' && (
                <>
                  ⏳ Wait for <strong>{step.waitDays || '??'}</strong> day(s)
                </>
              )}
              {step.type === 'condition' && (
                <>
                  🔍 User behavior: <strong>{step.conditionType || 'Not selected'}</strong>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default CampaignPreview;
