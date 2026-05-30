import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import TaxDetailPage from './pages/TaxDetailPage.jsx';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tax/:dexNumber" element={<TaxDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
