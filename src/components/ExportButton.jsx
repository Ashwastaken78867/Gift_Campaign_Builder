import { useSelector } from 'react-redux';

function ExportButton() {
  const steps = useSelector((state) => state.campaign.steps);

  const handleExport = () => {
    const dataStr = JSON.stringify(steps, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'campaign.json';
    link.click();
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition-all"
    >
      📤 Export Campaign
    </button>
  );
}

export default ExportButton;
