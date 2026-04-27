import { useCallback } from 'react';
import { useBoardStore } from '../store/boardStore';
import { useSolverStore } from '../store/solverStore';

export const useBoard = () => {
  const { board, toggleCell, clearBoard, setBoard } = useBoardStore();
  const { clearSolution } = useSolverStore();

  const handleToggleCell = useCallback(
    (row, col) => {
      toggleCell(row, col);
      clearSolution(); // เคลียร์ solution เมื่อ board เปลี่ยน
    },
    [toggleCell, clearSolution]
  );

  const handleClearBoard = useCallback(() => {
    clearBoard();
    clearSolution();
  }, [clearBoard, clearSolution]);

  const handleSetBoard = useCallback(
    (newBoard) => {
      setBoard(newBoard);
      clearSolution();
    },
    [setBoard, clearSolution]
  );

  const filledCount = board.flat().filter((c) => c !== 0).length;
  const fillPercent = Math.round((filledCount / 100) * 100);

  return {
    board,
    handleToggleCell,
    handleClearBoard,
    handleSetBoard,
    filledCount,
    fillPercent,
  };
};