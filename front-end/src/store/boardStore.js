import { create } from 'zustand';
import { createEmptyBoard, cloneBoard } from '../solver/boardUtils';

export const useBoardStore = create((set, get) => ({
  board: createEmptyBoard(),

  toggleCell: (row, col) => {
    const board = cloneBoard(get().board);
    board[row][col] = board[row][col] === 0 ? 1 : 0;
    set({ board });
  },

  setCell: (row, col, value) => {
    const board = cloneBoard(get().board);
    board[row][col] = value;
    set({ board });
  },

  setBoard: (board) => set({ board }),

  clearBoard: () => set({ board: createEmptyBoard() }),

  fillBoard: (cells) => {
    // cells = [{row, col, value}]
    const board = cloneBoard(get().board);
    cells.forEach(({ row, col, value }) => {
      board[row][col] = value ?? 1;
    });
    set({ board });
  },
}));