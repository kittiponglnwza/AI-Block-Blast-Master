import { create } from 'zustand'

export const useScoreStore = create((set, get) => ({
  totalScore: 0,
  totalLines: 0,
  statusMsg: 'วาดบนกระดาน หรือสุ่มกระดาน/ชิ้นส่วน แล้วกด Solve',

  addScore: (score, lines) =>
    set({ totalScore: get().totalScore + score, totalLines: get().totalLines + lines }),

  resetScore: () => set({ totalScore: 0, totalLines: 0 }),

  setStatus: (msg) => set({ statusMsg: msg }),
}))
