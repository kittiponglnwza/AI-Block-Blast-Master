import React, { useState } from 'react'
import { usePieces } from '../../hooks/usePieces'
import { PRESETS, PIECE_COLORS } from './Presets'
import styles from './PieceEditor.module.css'

const GRID_SIZE = 5

const PresetThumb = ({ preset, colorIdx, onClick }) => {
  const cells = preset.cells
  const maxR = Math.max(...cells.map(([r]) => r))
  const maxC = Math.max(...cells.map(([, c]) => c))
  const rows = maxR + 1
  const cols = maxC + 1
  const set = new Set(cells.map(([r, c]) => `${r},${c}`))
  const color = PIECE_COLORS[colorIdx]
  const size = 9

  return (
    <button className={styles.thumbBtn} onClick={onClick} title={preset.name}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${size}px)`, gap: 1 }}>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => (
            <div
              key={`${r}-${c}`}
              style={{
                width: size, height: size, borderRadius: 2,
                background: set.has(`${r},${c}`) ? color : 'transparent',
              }}
            />
          ))
        )}
      </div>
      <span className={styles.thumbLabel}>{preset.name}</span>
    </button>
  )
}

const PieceEditor = () => {
  const { pieces, selectedPieceIdx, togglePieceCell, setPiece, clearPiece } = usePieces()
  const [showPresets, setShowPresets] = useState(false)
  const piece = pieces[selectedPieceIdx]
  const color = PIECE_COLORS[selectedPieceIdx]
  const cellSet = new Set(piece.cells.map(([r, c]) => `${r},${c}`))

  return (
    <div className={styles.wrapper}>
      <div className={styles.editorRow}>
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
          <button
            className={`${styles.ctrlBtn} ${showPresets ? styles.active : ''}`}
            onClick={() => setShowPresets((v) => !v)}
          >
            {showPresets ? '✕ ปิด' : '⊞ Preset'}
          </button>
          <button className={styles.ctrlBtn} onClick={() => clearPiece(selectedPieceIdx)}>
            ✕ ล้าง
          </button>
        </div>
      </div>

      {showPresets && (
        <div className={styles.presetPanel}>
          <div className={styles.presetGrid}>
            {PRESETS.map((preset, i) => (
              <PresetThumb
                key={i}
                preset={preset}
                colorIdx={selectedPieceIdx}
                onClick={() => { setPiece(selectedPieceIdx, preset.cells); setShowPresets(false) }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PieceEditor