import React from 'react'
import { FILLED_COLOR, PIECE_COLORS } from '../pieces/Presets'
import styles from './BoardCell.module.css'

const BoardCell = ({ value, onClick }) => {
  let bg = '#ede9e3'
  if (value === 1) bg = FILLED_COLOR
  else if (value >= 2) bg = PIECE_COLORS[value - 2] || FILLED_COLOR

  return (
    <div className={styles.cell} style={{ background: bg }} onClick={onClick} />
  )
}

export default BoardCell
