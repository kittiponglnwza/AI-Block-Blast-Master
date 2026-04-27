import React from 'react'
import PieceMini from './PieceMini'
import styles from './PieceSlot.module.css'

const PieceSlot = ({ piece, pieceIdx, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.slot} ${isSelected ? styles.active : ''}`}
      onClick={onClick}
    >
      <span className={styles.label}>Figure {pieceIdx + 1}</span>
      <div className={styles.preview}>
        <PieceMini cells={piece.cells} colorIdx={pieceIdx} cellSize={14} />
      </div>
    </div>
  )
}

export default PieceSlot
