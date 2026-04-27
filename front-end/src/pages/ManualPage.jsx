import React from 'react';
import BoardGrid from '../components/board/BoardGrid';
import PieceBuilder from '../components/pieces/PieceBuilder';
import PieceSlot from '../components/pieces/PieceSlot';
import SolverPanel from '../components/solver/SolverPanel';
import { useBoard } from '../hooks/useBoard';
import { usePieces } from '../hooks/usePieces';

const stat = (label, value, color = '#c084fc') => (
  <div style={{
    background: 'rgba(19,17,32,0.9)',
    border: '1px solid #2a2545',
    borderRadius: '10px',
    padding: '10px 18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    minWidth: '80px',
  }}>
    <span style={{ fontSize: '9px', color: '#6b6490', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'Chakra Petch, sans-serif' }}>{label}</span>
    <span style={{ fontSize: '22px', fontFamily: 'Chakra Petch, sans-serif', fontWeight: '700', color, lineHeight: 1 }}>{value}</span>
  </div>
);

const ManualPage = () => {
  const { handleClearBoard, filledCount, fillPercent } = useBoard();
  const { pieces, selectedPieceIdx, setSelectedPiece, handleClearAllPieces, activePiecesCount } = usePieces();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '18px',
      padding: '20px 16px 40px',
      width: '100%',
      maxWidth: '440px',
      margin: '0 auto',
    }}>

      {/* ─── HUD Stats ─── */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
        {stat('Filled', `${filledCount}/64`, '#c084fc')}
        {stat('Density', `${fillPercent}%`, fillPercent > 60 ? '#f0436a' : fillPercent > 30 ? '#f4c542' : '#2de08a')}
        {stat('Pieces', `${activePiecesCount}/3`, '#38bdf8')}
        <button
          onClick={() => { handleClearBoard(); handleClearAllPieces(); }}
          style={{
            background: 'rgba(240,67,106,0.06)',
            border: '1px solid rgba(240,67,106,0.25)',
            color: 'rgba(240,67,106,0.7)',
            borderRadius: '10px',
            padding: '0 14px',
            cursor: 'pointer',
            fontSize: '11px',
            fontFamily: 'Chakra Petch, sans-serif',
            fontWeight: '600',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
            minWidth: '60px',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(240,67,106,0.15)';
            e.target.style.borderColor = 'rgba(240,67,106,0.5)';
            e.target.style.color = '#f0436a';
          }}
          onMouseLeave={e => {
            e.target.style.background = 'rgba(240,67,106,0.06)';
            e.target.style.borderColor = 'rgba(240,67,106,0.25)';
            e.target.style.color = 'rgba(240,67,106,0.7)';
          }}
        >
          Reset
        </button>
      </div>

      {/* ─── Board ─── */}
      <BoardGrid />

      {/* ─── Section divider ─── */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #2a2545)' }} />
        <span style={{ fontSize: '10px', color: '#6b6490', letterSpacing: '3px', fontFamily: 'Chakra Petch, sans-serif', textTransform: 'uppercase' }}>Piece Selection</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #2a2545, transparent)' }} />
      </div>

      {/* ─── Piece Preview Slots ─── */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {pieces.map((p, i) => (
          <PieceSlot key={i} piece={p} isSelected={selectedPieceIdx === i} onClick={() => setSelectedPiece(i)} />
        ))}
      </div>

      {/* ─── Section divider ─── */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #2a2545)' }} />
        <span style={{ fontSize: '10px', color: '#6b6490', letterSpacing: '3px', fontFamily: 'Chakra Petch, sans-serif', textTransform: 'uppercase' }}>Draw Blocks</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #2a2545, transparent)' }} />
      </div>

      {/* ─── Piece Builders ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%' }}>
        {[0, 1, 2].map((i) => (
          <PieceBuilder key={i} pieceIdx={i} />
        ))}
      </div>

      {/* ─── Section divider ─── */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #2a2545)' }} />
        <span style={{ fontSize: '10px', color: '#6b6490', letterSpacing: '3px', fontFamily: 'Chakra Petch, sans-serif', textTransform: 'uppercase' }}>AI Solver</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #2a2545, transparent)' }} />
      </div>

      {/* ─── Solver Panel ─── */}
      <div style={{ width: '100%' }}>
        <SolverPanel />
      </div>
    </div>
  );
};

export default ManualPage;