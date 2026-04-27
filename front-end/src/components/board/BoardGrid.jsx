import React from 'react'
import BoardCell from './BoardCell'
import { useBoard } from '../../hooks/useBoard'
import styles from './BoardGrid.module.css'

const BoardGrid = () => {
  const { board, handleToggleCell } = useBoard()

  return (
    <div className={styles.grid}>
      {board.map((row, r) =>
        row.map((cell, c) => (
          <BoardCell
            key={`${r}-${c}`}
            value={cell}
            onClick={() => handleToggleCell(r, c)}
          />
        ))
      )}
    </div>
  )
}

export default BoardGrid
