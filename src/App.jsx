import Header from './components/Header';
import Footer from './components/Footer';
import StepList from './components/StepList';
import ExportButton from './components/ExportButton';
import CampaignPreview from './components/CampaignPreview';
import Sidebar from './components/Sidebar'; // ✅ new

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow px-4 md:px-10 py-6">
        <div className="flex justify-end mb-4">
          <ExportButton />
        </div>

        {/* ✅ Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3">
            <Sidebar />
          </div>
          <div className="md:col-span-5">
            <StepList />
          </div>
          <div className="md:col-span-4">
            <CampaignPreview />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
