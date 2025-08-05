import { useSelector } from 'react-redux';

function ExportButton() {
  // Corrected selector to use the steps slice
  const steps = useSelector((state) => state.steps.steps);

  const handleExport = () => {
    const dataStr = JSON.stringify(steps, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'campaign.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // cleanup
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 rounded shadow-md transition-all bg-blue-600 hover:bg-blue-700 text-white"
    >
      📤 Export Campaign
    </button>
  );
}

export default ExportButton;
