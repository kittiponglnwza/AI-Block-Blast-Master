import { create } from 'zustand'
import { PRESETS } from '../components/pieces/Presets'

const emptyPiece = () => ({ cells: [] })

export const usePiecesStore = create((set, get) => ({
  pieces: [emptyPiece(), emptyPiece(), emptyPiece()],
  selectedPieceIdx: 0,

  setSelectedPiece: (idx) => set({ selectedPieceIdx: idx }),

  // ✅ ไม่ normalize — เก็บ coordinates ตามที่วาดในตาราง 5×5 จริงๆ
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
      return { cells }
    })
    set({ pieces })
  },

  // setPiece จาก preset: normalize ให้ top-left = 0,0 (presets ทำมาแล้ว)
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
