import React from 'react'
import { PIECE_COLORS } from './Presets'

const PieceMini = ({ cells, colorIdx, cellSize = 14 }) => {
  if (!cells || cells.length === 0) {
    return (
      <div
        style={{
          width: cellSize * 3,
          height: cellSize * 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 10, color: '#bbb' }}>—</span>
      </div>
    )
  }

  const maxR = Math.max(...cells.map(([r]) => r))
  const maxC = Math.max(...cells.map(([, c]) => c))
  const rows = maxR + 1
  const cols = maxC + 1
  const set = new Set(cells.map(([r, c]) => `${r},${c}`))
  const color = PIECE_COLORS[colorIdx] || PIECE_COLORS[0]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gap: 2,
      }}
    >
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <div
            key={`${r}-${c}`}
            style={{
              width: cellSize,
              height: cellSize,
              borderRadius: 3,
              background: set.has(`${r},${c}`) ? color : '#e8eaf6',
            }}
          />
        ))
      )}
    </div>
  )
}

export default PieceMini
