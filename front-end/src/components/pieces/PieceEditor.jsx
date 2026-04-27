import React from 'react'
import { usePieces } from '../../hooks/usePieces'
import { PRESETS, PIECE_COLORS } from './Presets'
import styles from './PieceEditor.module.css'

const GRID_SIZE = 5

const PieceEditor = () => {
  const { pieces, selectedPieceIdx, togglePieceCell, setPiece, clearPiece } = usePieces()
  const piece = pieces[selectedPieceIdx]
  const color = PIECE_COLORS[selectedPieceIdx]
  const cellSet = new Set(piece.cells.map(([r, c]) => `${r},${c}`))

  const handlePreset = (e) => {
    const idx = parseInt(e.target.value)
    if (isNaN(idx)) return
    setPiece(selectedPieceIdx, PRESETS[idx].cells)
    e.target.value = ''
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {Array.from({ length: GRID_SIZE }, (_, r) =>
          Array.from({ length: GRID_SIZE }, (_, c) => {
            const active = cellSet.has(`${r},${c}`)
            return (
              <div
                key={`${r}-${c}`}
                className={styles.cell}
                style={{ background: active ? color : '#e8eaf6' }}
                onClick={() => togglePieceCell(selectedPieceIdx, r, c)}
              />
            )
          })
        )}
      </div>
      <div className={styles.controls}>
        <select className={styles.select} onChange={handlePreset} defaultValue="">
          <option value="" disabled>— Preset —</option>
          {PRESETS.map((p, i) => (
            <option key={i} value={i}>{p.name}</option>
          ))}
        </select>
        <button
          className={styles.clearBtn}
          onClick={() => clearPiece(selectedPieceIdx)}
        >
          ล้าง
        </button>
      </div>
    </div>
  )
}

export default PieceEditor
