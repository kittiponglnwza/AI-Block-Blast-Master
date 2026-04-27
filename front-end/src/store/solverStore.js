import { create } from 'zustand';

export const useSolverStore = create((set) => ({
  solution: null,       // { steps, score, totalLines }
  currentStep: 0,
  isLoading: false,
  error: null,

  setSolution: (solution) => set({ solution, currentStep: 0, error: null }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearSolution: () => set({ solution: null, currentStep: 0, error: null }),
}));