import React, { useState } from 'react'
import BoardGrid from '../components/board/BoardGrid'
import PieceSlot from '../components/pieces/PieceSlot'
import PieceEditor from '../components/pieces/PieceEditor'
import ScoreBar from '../components/ui/ScoreBar'
import { useBoard } from '../hooks/useBoard'
import { usePieces } from '../hooks/usePieces'
import { useSolver } from '../hooks/useSolver'
import { useScoreStore } from '../store/scoreStore'
import styles from './SolverPage.module.css'

// Mini 8×8 board showing where a piece can be placed
const MiniBoard = ({ board, validCells, color }) => {
  const validSet = new Set(validCells.map(([r, c]) => `${r},${c}`))

  return (
    <div className={styles.miniBoard}>
      {Array.from({ length: 8 }, (_, r) =>
        Array.from({ length: 8 }, (_, c) => {
          const filled = board[r][c] !== 0
          const valid = validSet.has(`${r},${c}`)

          return (
            <div
              key={`${r}-${c}`}
              className={styles.miniCell}
              style={{
                background: filled
                  ? '#c8c4b8'
                  : valid
                  ? color
                  : '#f0ede8',
                opacity: valid ? 0.75 : 1,
              }}
            />
          )
        })
      )}
    </div>
  )
}

const SolverPage = () => {
  const { handleClearBoard, handleRandomBoard } = useBoard()

  const {
    pieces,
    selectedPieceIdx,
    setSelectedPiece,
    clearAllPieces,
    handleRandomPieces,
  } = usePieces()

  const { handleSolve, getPlan } = useSolver()
  const { resetScore } = useScoreStore()

  const [showPlan, setShowPlan] = useState(false)
  const [plan, setPlan] = useState(null)
  const [activePlanIdx, setActivePlanIdx] = useState(0)

  const handleClearAll = () => {
    handleClearBoard()
    clearAllPieces()
    resetScore()
  }

  const handlePreSolve = () => {
    const p = getPlan()

    if (!p || p.activeCount === 0) {
      handleSolve()
      return
    }

    setPlan(p)
    setActivePlanIdx(0)
    setShowPlan(true)
  }

  const handleConfirmSolve = () => {
    setShowPlan(false)
    handleSolve()
  }

  const PIECE_LABELS = ['Figure 1', 'Figure 2', 'Figure 3']
  const PLAN_COLORS = ['#e8846a', '#6aabe8', '#6ad4a0']

  return (
    <div className={styles.page}>
      <ScoreBar />

      <div className={styles.mainRow}>
        {/* Left panel */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Current Board</h2>

          <p className={styles.hint}>
            Click cells to draw/remove or generate random board
          </p>

          <div className={styles.genRow}>
            <button
              className={styles.genBtn}
              onClick={handleClearBoard}
            >
              Empty Board
            </button>

            <button
              className={styles.genBtn}
              onClick={handleRandomBoard}
            >
              Random Board
            </button>
          </div>

          <BoardGrid />
        </div>

        {/* Right panel */}
        <div className={`${styles.panel} ${styles.piecesPanel}`}>
          <h2 className={styles.panelTitle}>Pieces in Hand (3 Pieces)</h2>

          <p className={styles.hint}>
            Choose preset or draw manually in the 5×5 grid
          </p>

          <div className={styles.genRow}>
            <button
              className={styles.genBtn}
              onClick={handleRandomPieces}
            >
              Random Pieces
            </button>

            <button
              className={styles.genBtn}
              onClick={clearAllPieces}
            >
              Clear Pieces
            </button>
          </div>

          <div className={styles.piecesRow}>
            {pieces.map((p, i) => (
              <PieceSlot
                key={i}
                piece={p}
                pieceIdx={i}
                isSelected={selectedPieceIdx === i}
                onClick={() => setSelectedPiece(i)}
              />
            ))}
          </div>

          <div className={styles.editorSection}>
            <p className={styles.editorHint}>
              Click a piece above, then edit it in this grid
            </p>

            <PieceEditor />
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className={styles.btnRow}>
        <button
          className={styles.btnClear}
          onClick={handleClearAll}
        >
          Clear
        </button>

        <button
          className={styles.btnSolve}
          onClick={handlePreSolve}
        >
          Solve ✦
        </button>
      </div>

      {/* Plan modal */}
      {showPlan && plan && (
        <div
          className={styles.overlay}
          onClick={() => setShowPlan(false)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>Placement Plan</span>

              <span className={styles.modalSub}>
                {plan.activeCount} pieces ·{' '}
                {plan.permutations} orders ·{' '}
                {plan.placements.reduce((s, p) => s + p.count, 0)} positions
              </span>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
              {plan.placements.map((p, i) => (
                <button
                  key={i}
                  className={`${styles.tab} ${
                    activePlanIdx === i ? styles.tabActive : ''
                  }`}
                  style={
                    activePlanIdx === i
                      ? {
                          borderColor: PLAN_COLORS[p.pieceIdx],
                          color: PLAN_COLORS[p.pieceIdx],
                        }
                      : {}
                  }
                  onClick={() => setActivePlanIdx(i)}
                >
                  {PIECE_LABELS[p.pieceIdx]}

                  <span className={styles.tabCount}>
                    {p.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Preview */}
            {(() => {
              const cur = plan.placements[activePlanIdx]

              return (
                <div className={styles.previewSection}>
                  <MiniBoard
                    board={plan.board}
                    validCells={cur.validCells}
                    color={PLAN_COLORS[cur.pieceIdx]}
                  />

                  <div className={styles.previewLegend}>
                    <span
                      className={styles.legendDot}
                      style={{
                        background:
                          PLAN_COLORS[cur.pieceIdx],
                      }}
                    />

                    <span className={styles.legendText}>
                      Valid placements: {cur.count}
                    </span>
                  </div>
                </div>
              )
            })()}

            {/* Modal buttons */}
            <div className={styles.modalBtns}>
              <button
                className={styles.modalCancel}
                onClick={() => setShowPlan(false)}
              >
                Cancel
              </button>

              <button
                className={styles.modalConfirm}
                onClick={handleConfirmSolve}
              >
                Solve ✦
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SolverPage