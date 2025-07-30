import Header from './components/Header';
import Footer from './components/Footer';
import StepList from './components/StepList';
import ExportButton from './components/ExportButton';
import CampaignPreview from './components/CampaignPreview'; // ✅ Import preview
import CampaignHeader from './components/CampaignHeader';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="max-w-3xl mx-auto p-4">
      <CampaignHeader />
      </div>
      
      <main className="flex-grow px-4 md:px-10 py-6">
        <div className="flex justify-end mb-4">
          <ExportButton />
        </div>

        {/* ✅ Grid layout for step editor and preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StepList />
          <CampaignPreview />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
