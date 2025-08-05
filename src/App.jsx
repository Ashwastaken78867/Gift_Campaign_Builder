import Header from './components/Header';
import StepList from './components/StepList';
import ExportButton from './components/ExportButton';
import CampaignPreview from './components/CampaignPreview';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed width, full height */}
        <div className="w-64 bg-gray-100 h-full">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 h-full overflow-y-auto bg-gray-100 p-6">
          <div className="flex flex-col h-full">
            {/* Top right export button */}
            <div className="flex justify-end mb-4">
              <ExportButton />
            </div>

            {/* Main layout with middle (StepList) and right (Preview) */}
            <div className="flex flex-1 gap-6">
              <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-y-auto">
                <StepList />
              </div>
              <div className="w-64 bg-white rounded-lg shadow p-4 overflow-y-auto">
                <CampaignPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
