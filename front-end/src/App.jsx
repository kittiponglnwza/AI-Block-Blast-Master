import React from 'react';
import ManualPage from './pages/ManualPage';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">BLOCK BLAST SOLVER</h1>
        <span className="app-subtitle">AI Universal Puzzle Solver</span>
      </header>
      <main>
        <ManualPage />
      </main>
    </div>
  );
};

export default App;