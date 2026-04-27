import { create } from 'zustand';

const EMPTY_PIECE = { cells: [], color: '#00f0ff' };

const DEFAULT_COLORS = ['#ff4060', '#00e676', '#00b0ff'];

export const usePiecesStore = create((set, get) => ({
  pieces: [
    { ...EMPTY_PIECE, color: DEFAULT_COLORS[0] },
    { ...EMPTY_PIECE, color: DEFAULT_COLORS[1] },
    { ...EMPTY_PIECE, color: DEFAULT_COLORS[2] },
  ],

  selectedPieceIdx: 0,

  setSelectedPiece: (idx) => set({ selectedPieceIdx: idx }),

  togglePieceCell: (pieceIdx, row, col) => {
    const pieces = get().pieces.map((p, i) => {
      if (i !== pieceIdx) return p;
      const exists = p.cells.some(([r, c]) => r === row && c === col);
      const cells = exists
        ? p.cells.filter(([r, c]) => !(r === row && c === col))
        : [...p.cells, [row, col]];
      return { ...p, cells };
    });
    set({ pieces });
  },

  setPieceCells: (pieceIdx, cells) => {
    const pieces = get().pieces.map((p, i) =>
      i === pieceIdx ? { ...p, cells } : p
    );
    set({ pieces });
  },

  clearPiece: (pieceIdx) => {
    const pieces = get().pieces.map((p, i) =>
      i === pieceIdx ? { ...p, cells: [] } : p
    );
    set({ pieces });
  },

  clearAllPieces: () =>
    set({
      pieces: DEFAULT_COLORS.map((color) => ({ ...EMPTY_PIECE, color })),
    }),

  setPieces: (pieces) => set({ pieces }),
}));