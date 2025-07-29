import Header from './components/Header';
import Footer from './components/Footer';
import StepList from './components/StepList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow px-4 md:px-10 py-6">
        <StepList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
