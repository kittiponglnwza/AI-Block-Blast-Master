import React from 'react'
import { useScoreStore } from '../../store/scoreStore'
import { useBoardStore } from '../../store/boardStore'
import styles from './ScoreBar.module.css'

const ScoreBar = () => {
  const { totalScore, totalLines, statusMsg } = useScoreStore()
  const board = useBoardStore(s => s.board)
  const filledCount = board.flat().filter(c => c !== 0).length

  return (
    <div className={styles.bar}>
      <div className={styles.stats}>
        <StatItem label="Score" value={totalScore} color="#c8704a" />
        <div className={styles.divider} />
        <StatItem label="Lines" value={totalLines} color="#4a82b4" />
        <div className={styles.divider} />
        <StatItem label="Filled" value={`${filledCount}/64`} color="#4aaa7a" />
      </div>
      <div className={styles.status}>{statusMsg}</div>
    </div>
  )
}

const StatItem = ({ label, value, color }) => (
  <div className={styles.statItem}>
    <span className={styles.statLabel}>{label}</span>
    <span className={styles.statValue} style={{ color }}>{value}</span>
  </div>
)

export default ScoreBar
