import { useCallback } from 'react';
import { usePiecesStore } from '../store/piecesStore';
import { useSolverStore } from '../store/solverStore';

export const usePieces = () => {
  const {
    pieces,
    selectedPieceIdx,
    setSelectedPiece,
    togglePieceCell,
    clearPiece,
    clearAllPieces,
    setPieces,
  } = usePiecesStore();

  const { clearSolution } = useSolverStore();

  const handleTogglePieceCell = useCallback(
    (pieceIdx, row, col) => {
      togglePieceCell(pieceIdx, row, col);
      clearSolution();
    },
    [togglePieceCell, clearSolution]
  );

  const handleClearPiece = useCallback(
    (pieceIdx) => {
      clearPiece(pieceIdx);
      clearSolution();
    },
    [clearPiece, clearSolution]
  );

  const handleClearAllPieces = useCallback(() => {
    clearAllPieces();
    clearSolution();
  }, [clearAllPieces, clearSolution]);

  const activePiecesCount = pieces.filter((p) => p.cells.length > 0).length;

  return {
    pieces,
    selectedPieceIdx,
    setSelectedPiece,
    handleTogglePieceCell,
    handleClearPiece,
    handleClearAllPieces,
    setPieces,
    activePiecesCount,
  };
};