import { create } from 'zustand'

export const useScoreStore = create((set, get) => ({
  totalScore: 0,
  totalLines: 0,

  statusMsg:
    'Draw on the board or generate a random board/pieces, then press Solve.',

  addScore: (score, lines) =>
    set({
      totalScore:
        get().totalScore + score,

      totalLines:
        get().totalLines + lines,
    }),

  resetScore: () =>
    set({
      totalScore: 0,
      totalLines: 0,
    }),

  setStatus: (msg) =>
    set({
      statusMsg: msg,
    }),
}))