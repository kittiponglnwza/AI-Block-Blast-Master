import React from 'react';
import BoardGrid from '../components/board/BoardGrid';
import PieceBuilder from '../components/pieces/PieceBuilder';
import PieceSlot from '../components/pieces/PieceSlot';
import SolverPanel from '../components/solver/SolverPanel';
import { useBoard } from '../hooks/useBoard';
import { usePieces } from '../hooks/usePieces';

const ManualPage = () => {
  const { handleClearBoard, filledCount, fillPercent } = useBoard();
  const { pieces, selectedPieceIdx, setSelectedPiece, handleClearAllPieces, activePiecesCount } = usePieces();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px 16px' }}>

      {/* HUD */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#4a6080', letterSpacing: '2px' }}>FILLED</div>
          <div style={{ fontSize: '20px', fontFamily: 'Orbitron,sans-serif', color: '#00f0ff' }}>{filledCount}/100</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#4a6080', letterSpacing: '2px' }}>PIECES</div>
          <div style={{ fontSize: '20px', fontFamily: 'Orbitron,sans-serif', color: '#ffd700' }}>{activePiecesCount}/3</div>
        </div>
        <button
          onClick={handleClearBoard}
          style={{ background: 'none', border: '1px solid #1a3050', color: '#4a6080', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer', fontSize: '12px' }}
        >
          ล้าง Board
        </button>
      </div>

      {/* Board */}
      <BoardGrid />

      {/* Piece Slots (เลือกดูตัวที่สร้างแล้ว) */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {pieces.map((p, i) => (
          <PieceSlot key={i} piece={p} isSelected={selectedPieceIdx === i} onClick={() => setSelectedPiece(i)} />
        ))}
      </div>

      {/* Piece Builders */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[0, 1, 2].map((i) => (
          <PieceBuilder key={i} pieceIdx={i} />
        ))}
      </div>

      {/* Solver */}
      <div style={{ width: 'min(380px, 95vw)' }}>
        <SolverPanel />
      </div>
    </div>
  );
};

export default ManualPage;