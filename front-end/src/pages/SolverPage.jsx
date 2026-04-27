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

const SolverPage = () => {
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
      <ScoreBar />

      <div className={styles.mainRow}>
        {/* Left: draw the board state */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>กระดานปัจจุบัน</h2>
          <p style={{ fontSize: 11, color: '#9e9bbf', textAlign: 'center', marginBottom: 10 }}>
            คลิกเซลเพื่อวาด/ลบ หรือสุ่ม
          </p>
          <div className={styles.genRow}>
            <button className={styles.genBtn} onClick={() => handleClearBoard()}>ว่างเปล่า</button>
            <button className={styles.genBtn} onClick={handleRandomBoard}>สุ่มกระดาน</button>
          </div>
          <BoardGrid />
        </div>

        {/* Right: set the 3 pieces in hand */}
        <div className={`${styles.panel} ${styles.piecesPanel}`}>
          <h2 className={styles.panelTitle}>ชิ้นส่วนในมือ (3 ชิ้น)</h2>
          <p style={{ fontSize: 11, color: '#9e9bbf', textAlign: 'center', marginBottom: 10 }}>
            เลือก preset หรือวาดเองในตาราง 5×5
          </p>
          <div className={styles.genRow}>
            <button className={styles.genBtn} onClick={handleRandomPieces}>สุ่มชิ้นส่วน</button>
            <button className={styles.genBtn} onClick={clearAllPieces}>ล้างชิ้นส่วน</button>
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
            <p className={styles.editorHint}>คลิกชิ้นส่วนด้านบน แล้วแก้ไขในตารางนี้</p>
            <PieceEditor />
          </div>
        </div>
      </div>

      <div className={styles.btnRow}>
        <button className={styles.btnClear} onClick={handleClearAll}>Clear</button>
        <button className={styles.btnSolve} onClick={handleSolve}>Solve ✦</button>
      </div>
    </div>
  )
}

export default SolverPage
