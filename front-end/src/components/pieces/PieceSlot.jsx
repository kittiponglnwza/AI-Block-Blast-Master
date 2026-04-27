import React from 'react';
import './PieceSlot.css';

const PieceSlot = ({ piece, isSelected, onClick }) => {
  if (!piece || piece.cells.length === 0) {
    return (
      <div className={`piece-slot empty ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        <span className="piece-slot-empty-label">วาด Block</span>
      </div>
    );
  }

  const rows = Math.max(...piece.cells.map(([r]) => r)) + 1;
  const cols = Math.max(...piece.cells.map(([, c]) => c)) + 1;

  return (
    <div className={`piece-slot ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <div
        className="piece-slot-grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 20px)`, gridTemplateRows: `repeat(${rows}, 20px)` }}
      >
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const on = piece.cells.some(([pr, pc]) => pr === r && pc === c);
            return (
              <div
                key={`${r}-${c}`}
                className="piece-slot-cell"
                style={on ? { background: piece.color, border: `1px solid ${piece.color}`, boxShadow: `0 0 4px ${piece.color}88` } : { background: 'transparent', border: 'none' }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default PieceSlot;