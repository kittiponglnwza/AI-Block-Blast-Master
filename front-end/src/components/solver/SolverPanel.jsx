import React from 'react';
import { useSolver } from '../../hooks/useSolver';
import { usePiecesStore } from '../../store/piecesStore';
import './SolverPanel.css';

const SolverPanel = () => {
  const { solution, currentStep, isLoading, error, runSolver, nextStep, prevStep, clearSolution } = useSolver();
  const { pieces } = usePiecesStore();

  return (
    <div className="solver-panel">
      <button
        className="solve-btn"
        onClick={runSolver}
        disabled={isLoading}
      >
        {isLoading ? 'กำลังคำนวณ...' : '⚡ SOLVE'}
      </button>

      {error && <div className="solver-error">{error}</div>}

      {solution && (
        <div className="solution-box">
          <div className="solution-meta">
            คะแนนรวม: <strong>{solution.score}</strong> | ล้างแถว: <strong>{solution.totalLines}</strong>
          </div>

          <div className="solution-steps">
            {solution.steps.map((step, i) => {
              const piece = pieces[step.pieceIdx];
              return (
                <div
                  key={i}
                  className={`solution-step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
                  onClick={() => {/* setCurrentStep(i) */}}
                >
                  <div className="step-num">{i + 1}</div>
                  <div className="step-info">
                    <span className="step-piece" style={{ color: piece?.color }}>
                      Block {step.pieceIdx + 1}
                    </span>
                    <span className="step-pos">
                      → แถว {step.row + 1}, คอลัมน์ {step.col + 1}
                    </span>
                    {step.linesCleared > 0 && (
                      <span className="step-clear">+{step.linesCleared} แถว!</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="step-nav">
            <button onClick={prevStep} disabled={currentStep === 0}>← ก่อน</button>
            <span>{currentStep + 1} / {solution.steps.length}</span>
            <button onClick={nextStep} disabled={currentStep === solution.steps.length - 1}>ถัดไป →</button>
          </div>

          <button className="clear-btn" onClick={clearSolution}>ล้างผลลัพธ์</button>
        </div>
      )}
    </div>
  );
};

export default SolverPanel;