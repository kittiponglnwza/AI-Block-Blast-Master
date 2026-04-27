import React, { useState } from 'react';
import BoardCell from './BoardCell';
import { useBoard } from '../../hooks/useBoard';
import { useSolverStore } from '../../store/solverStore';
import { usePiecesStore } from '../../store/piecesStore';
import { canPlace } from '../../solver/boardUtils';
import './BoardGrid.css';

const BoardGrid = () => {
  const { board, handleToggleCell } = useBoard();
  const { solution, currentStep } = useSolverStore();
  const { pieces, selectedPieceIdx } = usePiecesStore();
  const [hoverPos, setHoverPos] = useState(null);

  // หา cells ที่ควร highlight จาก solution step ปัจจุบัน
  const getHighlightCells = () => {
    if (!solution || !solution.steps[currentStep]) return new Map();
    const step = solution.steps[currentStep];
    const { pieceIdx, row, col } = step;
    const piece = pieces[pieceIdx];
    if (!piece) return new Map();

    const map = new Map();
    piece.cells.forEach(([dr, dc]) => {
      map.set(`${row + dr},${col + dc}`, piece.color);
    });
    return map;
  };

  // preview hover
  const getPreviewCells = () => {
    if (!hoverPos || solution) return new Set();
    const piece = pieces[selectedPieceIdx];
    if (!piece || piece.cells.length === 0) return new Set();
    if (!canPlace(board, piece, hoverPos.row, hoverPos.col)) return new Set();

    const set = new Set();
    piece.cells.forEach(([dr, dc]) => {
      set.add(`${hoverPos.row + dr},${hoverPos.col + dc}`);
    });
    return set;
  };

  const highlights = getHighlightCells();
  const previews = getPreviewCells();

  return (
    <div className="board-grid">
      {board.map((row, r) =>
        row.map((cell, c) => {
          const key = `${r},${c}`;
          const isHighlight = highlights.has(key);
          const isPreview = previews.has(key);
          return (
            <BoardCell
              key={key}
              value={cell}
              isHighlight={isHighlight || isPreview}
              highlightColor={highlights.get(key)}
              onClick={() => handleToggleCell(r, c)}
              onMouseEnter={() => setHoverPos({ row: r, col: c })}
            />
          );
        })
      )}
    </div>
  );
};

export default BoardGrid;