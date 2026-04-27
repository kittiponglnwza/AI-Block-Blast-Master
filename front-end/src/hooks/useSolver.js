import { useCallback } from 'react';
import { useBoardStore } from '../store/boardStore';
import { usePiecesStore } from '../store/piecesStore';
import { useSolverStore } from '../store/solverStore';
import { solve } from '../solver/engine';

export const useSolver = () => {
  const { board } = useBoardStore();
  const { pieces } = usePiecesStore();
  const { solution, currentStep, isLoading, error, setSolution, setCurrentStep, setLoading, setError, clearSolution } =
    useSolverStore();

  const runSolver = useCallback(() => {
    const activePieces = pieces.filter((p) => p.cells.length > 0);
    if (activePieces.length === 0) {
      setError('กรุณาสร้าง piece อย่างน้อย 1 ชิ้น');
      return;
    }

    setLoading(true);
    clearSolution();

    // ใช้ setTimeout เพื่อไม่ให้ UI freeze
    setTimeout(() => {
      try {
        const result = solve(board, pieces);
        if (!result) {
          setError('ไม่สามารถวาง piece ได้ — board อาจเต็มเกินไป');
        } else {
          setSolution(result);
        }
      } catch (e) {
        setError('เกิดข้อผิดพลาด: ' + e.message);
      } finally {
        setLoading(false);
      }
    }, 50);
  }, [board, pieces, setSolution, setLoading, setError, clearSolution]);

  const nextStep = useCallback(() => {
    if (solution && currentStep < solution.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [solution, currentStep, setCurrentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }, [currentStep, setCurrentStep]);

  return {
    solution,
    currentStep,
    isLoading,
    error,
    runSolver,
    nextStep,
    prevStep,
    clearSolution,
  };
};