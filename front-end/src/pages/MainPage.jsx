import React from 'react'
import BoardGrid from '../components/board/BoardGrid'
import PieceSlot from '../components/pieces/PieceSlot'
import PieceEditor from '../components/pieces/PieceEditor'
import ScoreBar from '../components/ui/ScoreBar'
import { useBoard } from '../hooks/useBoard'
import { usePieces } from '../hooks/usePieces'
import { useSolver } from '../hooks/useSolver'
import { useScoreStore } from '../store/scoreStore'
import styles from './MainPage.module.css'

const MainPage = () => {
  const { handleClearBoard, handleRandomBoard } = useBoard()
  const {
    pieces,
    selectedPieceIdx,
    setSelectedPiece,
    clearAllPieces,
    handleRandomPieces,
  } = usePieces()
  const { handleSolve } = useSolver()
  const { resetScore } = useScoreStore()

  const handleClearAll = () => {
    handleClearBoard()
    clearAllPieces()
    resetScore()
  }

  return (
    <div className={styles.page}>
      {/* Top stats bar */}
      <ScoreBar />

      {/* Main two-panel row */}
      <div className={styles.mainRow}>
        {/* Left panel — initial grid */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Fill the initial grid</h2>
          <div className={styles.genRow}>
            <button className={styles.genBtn} onClick={() => handleClearBoard()}>
              ว่างเปล่า
            </button>
            <button className={styles.genBtn} onClick={handleRandomBoard}>
              สุ่มกระดาน
            </button>
          </div>
          <BoardGrid />
        </div>

        {/* Right panel — 3 figures */}
        <div className={`${styles.panel} ${styles.piecesPanel}`}>
          <h2 className={styles.panelTitle}>Fill the 3 figures</h2>
          <div className={styles.genRow}>
            <button className={styles.genBtn} onClick={handleRandomPieces}>
              สุ่มชิ้นส่วน
            </button>
            <button className={styles.genBtn} onClick={clearAllPieces}>
              ล้างชิ้นส่วน
            </button>
          </div>

          {/* Piece slots preview */}
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

          {/* Piece editor */}
          <div className={styles.editorSection}>
            <p className={styles.editorHint}>แก้ไขชิ้นส่วนที่เลือก (กดเซลเพื่อวาด)</p>
            <PieceEditor />
          </div>
        </div>
      </div>

      {/* Bottom action buttons */}
      <div className={styles.btnRow}>
        <button className={styles.btnClear} onClick={handleClearAll}>
          Clear
        </button>
        <button className={styles.btnSolve} onClick={handleSolve}>
          Solve ✦
        </button>
      </div>
    </div>
  )
}

export default MainPage
