import { create } from 'zustand'
import { PRESETS } from '../components/pieces/Presets'

const emptyPiece = () => ({ cells: [] })

export const usePiecesStore = create((set, get) => ({
  pieces: [emptyPiece(), emptyPiece(), emptyPiece()],
  selectedPieceIdx: 0,

  setSelectedPiece: (idx) => set({ selectedPieceIdx: idx }),

  togglePieceCell: (pieceIdx, row, col) => {
    const pieces = get().pieces.map((p, i) => {
      if (i !== pieceIdx) return p
      const cells = [...p.cells]
      const existing = cells.findIndex(([r, c]) => r === row && c === col)
      if (existing >= 0) {
        cells.splice(existing, 1)
      } else {
        cells.push([row, col])
      }
      // normalize
      if (cells.length === 0) return { cells: [] }
      const minR = Math.min(...cells.map(([r]) => r))
      const minC = Math.min(...cells.map(([, c]) => c))
      return { cells: cells.map(([r, c]) => [r - minR, c - minC]) }
    })
    set({ pieces })
  },

  setPiece: (pieceIdx, cells) => {
    const pieces = get().pieces.map((p, i) =>
      i === pieceIdx ? { cells: cells.map((c) => [...c]) } : p
    )
    set({ pieces })
  },

  clearPiece: (pieceIdx) => {
    const pieces = get().pieces.map((p, i) =>
      i === pieceIdx ? emptyPiece() : p
    )
    set({ pieces })
  },

  clearAllPieces: () =>
    set({ pieces: [emptyPiece(), emptyPiece(), emptyPiece()] }),

  randomPieces: () => {
    const shuffled = [...PRESETS].sort(() => Math.random() - 0.5).slice(0, 3)
    set({
      pieces: shuffled.map((p) => ({ cells: p.cells.map((c) => [...c]) })),
    })
  },
}))
