import React from 'react';
import ManualPage from './pages/ManualPage';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">BLOCK <span>BLAST</span> SOLVER</h1>
        <span className="app-subtitle">8 × 8 · AI Puzzle Engine</span>
      </header>
      <main>
        <ManualPage />
      </main>
    </div>
  );
};

export default App;