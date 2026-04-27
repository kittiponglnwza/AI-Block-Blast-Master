import React from 'react';
import { usePieces } from '../../hooks/usePieces';
import './PieceSlot.css';

const GRID = 5;

const PieceBuilder = ({ pieceIdx }) => {
  const { pieces, handleTogglePieceCell, handleClearPiece } = usePieces();
  const piece = pieces[pieceIdx];

  const isCellOn = (r, c) => piece.cells.some(([pr, pc]) => pr === r && pc === c);

  return (
    <div className="piece-builder">
      <div className="piece-builder-label">
        Block {pieceIdx + 1}
        <button className="piece-clear-btn" onClick={() => handleClearPiece(pieceIdx)}>
          ล้าง
        </button>
      </div>
      <div className="piece-builder-grid">
        {Array.from({ length: GRID }, (_, r) =>
          Array.from({ length: GRID }, (_, c) => {
            const on = isCellOn(r, c);
            return (
              <div
                key={`${r}-${c}`}
                className={`piece-builder-cell ${on ? 'on' : ''}`}
                style={on ? { background: piece.color, borderColor: piece.color } : {}}
                onClick={() => handleTogglePieceCell(pieceIdx, r, c)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default PieceBuilder;