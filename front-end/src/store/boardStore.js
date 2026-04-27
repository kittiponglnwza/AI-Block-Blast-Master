import { create } from 'zustand'
import { createEmptyBoard, cloneBoard } from '../solver/boardUtils'

export const useBoardStore = create((set, get) => ({
  board: createEmptyBoard(),

  toggleCell: (row, col) => {
    const board = cloneBoard(get().board)
    board[row][col] = board[row][col] === 0 ? 1 : 0
    set({ board })
  },

  setBoard: (board) => set({ board }),

  clearBoard: () => set({ board: createEmptyBoard() }),

  randomBoard: (density = 0.35) => {
    const board = createEmptyBoard()
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (Math.random() < density) board[r][c] = 1
      }
    }
    set({ board })
  },
}))
