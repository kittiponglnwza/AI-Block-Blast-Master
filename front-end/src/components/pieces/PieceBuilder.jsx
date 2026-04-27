import React, { useState } from 'react';
import { usePieces } from '../../hooks/usePieces';
import { PRESETS } from './presets';
import './PieceSlot.css';

const DRAW_GRID = 5;

// Mini preview of a preset shape (fits in 32x32 box)
const ShapeThumb = ({ cells, color, size = 32 }) => {
  const maxR = Math.max(...cells.map(([r]) => r));
  const maxC = Math.max(...cells.map(([, c]) => c));
  const rows = maxR + 1;
  const cols = maxC + 1;
  const cell = Math.min(Math.floor((size - 4) / Math.max(rows, cols)), 10);
  const gap = 1;
  const w = cols * cell + (cols - 1) * gap;
  const h = rows * cell + (rows - 1) * gap;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {cells.map(([r, c], i) => (
        <rect
          key={i}
          x={(size - w) / 2 + c * (cell + gap)}
          y={(size - h) / 2 + r * (cell + gap)}
          width={cell}
          height={cell}
          rx={1.5}
          fill={color}
          opacity={0.9}
        />
      ))}
    </svg>
  );
};

const PieceBuilder = ({ pieceIdx }) => {
  const { pieces, handleTogglePieceCell, handleClearPiece } = usePieces();
  const { setPieces } = usePieces();
  const piece = pieces[pieceIdx];
  const [tab, setTab] = useState('preset'); // 'preset' | 'draw'

  const isCellOn = (r, c) => piece.cells.some(([pr, pc]) => pr === r && pc === c);

  const applyPreset = (preset) => {
    const newPieces = pieces.map((p, i) =>
      i === pieceIdx ? { ...p, cells: preset.cells } : p
    );
    setPieces(newPieces);
  };

  return (
    <div className="piece-builder">
      {/* Header */}
      <div className="piece-builder-header">
        <div className="piece-builder-label">
          <span className="piece-builder-dot" style={{ background: piece.color, boxShadow: `0 0 6px ${piece.color}` }} />
          Block {pieceIdx + 1}
        </div>
        <button className="piece-clear-btn" onClick={() => handleClearPiece(pieceIdx)}>
          Clear
        </button>
      </div>

      {/* Tabs */}
      <div className="pb-tabs">
        <button
          className={`pb-tab ${tab === 'preset' ? 'active' : ''}`}
          onClick={() => setTab('preset')}
        >
          Presets
        </button>
        <button
          className={`pb-tab ${tab === 'draw' ? 'active' : ''}`}
          onClick={() => setTab('draw')}
        >
          Draw
        </button>
      </div>

      {/* Preset grid */}
      {tab === 'preset' && (
        <div className="preset-grid">
          {PRESETS.map((preset, i) => {
            const isActive = piece.cells.length === preset.cells.length &&
              preset.cells.every(([r, c]) => piece.cells.some(([pr, pc]) => pr === r && pc === c));
            return (
              <button
                key={i}
                className={`preset-btn ${isActive ? 'active' : ''}`}
                style={isActive ? { borderColor: piece.color, background: `${piece.color}18` } : {}}
                onClick={() => applyPreset(preset)}
                title={preset.name}
              >
                <ShapeThumb cells={preset.cells} color={isActive ? piece.color : '#6b6490'} size={34} />
              </button>
            );
          })}
        </div>
      )}

      {/* Draw grid */}
      {tab === 'draw' && (
        <div className="piece-builder-grid">
          {Array.from({ length: DRAW_GRID }, (_, r) =>
            Array.from({ length: DRAW_GRID }, (_, c) => {
              const on = isCellOn(r, c);
              return (
                <div
                  key={`${r}-${c}`}
                  className={`piece-builder-cell ${on ? 'on' : ''}`}
                  style={on ? {
                    background: piece.color,
                    borderColor: piece.color,
                    color: piece.color,
                    boxShadow: `0 0 6px ${piece.color}66`,
                  } : {}}
                  onClick={() => handleTogglePieceCell(pieceIdx, r, c)}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default PieceBuilder;