import React, { useState } from 'react'
import GamePage from './pages/GamePage'
import SolverPage from './pages/SolverPage'
import './App.css'

const App = () => {
  const [mode, setMode] = useState(null)

  if (!mode) {
    return <ModeSelect onSelect={setMode} />
  }

  return (
    <div className="app-root">
      <div className="mode-bar">
        <button className="mode-back" onClick={() => setMode(null)}>← Back</button>
        <span className="mode-title">
          {mode === 'game' ? '🎮 Block Blast' : '🧠 Board Solver'}
        </span>
        <button
          className="mode-switch"
          onClick={() => setMode(mode === 'game' ? 'solver' : 'game')}
        >
          Switch to {mode === 'game' ? 'Solver' : 'Game'}
        </button>
      </div>
      {mode === 'game' ? <GamePage /> : <SolverPage />}
    </div>
  )
}

const ModeSelect = ({ onSelect }) => (
  <div className="mode-select">
    <h1 className="mode-select-title">Block Blast</h1>
    <p className="mode-select-sub">เลือกโหมดที่ต้องการ</p>
    <div className="mode-cards">
      <button className="mode-card" onClick={() => onSelect('game')}>
        <div className="mode-card-icon">🎮</div>
        <div className="mode-card-name">Play Game</div>
        <div className="mode-card-desc">
          สุ่มกระดาน + บล็อก 3 ชิ้น<br />
          AI แนะนำตำแหน่งวางที่ดีที่สุด<br />
          เล่นได้ด้วยตัวเองหรือกด AI
        </div>
      </button>
      <button className="mode-card" onClick={() => onSelect('solver')}>
        <div className="mode-card-icon">🧠</div>
        <div className="mode-card-name">Board Solver</div>
        <div className="mode-card-desc">
          วาดกระดานจากเกมจริง<br />
          ใส่ชิ้นที่มีอยู่ในมือ<br />
          AI หาทางวางที่ดีที่สุดให้
        </div>
      </button>
    </div>
  </div>
)

export default App
