import React from 'react'
import { PIECE_COLORS } from './Presets'

const PieceMini = ({ cells, colorIdx, cellSize = 14 }) => {
  if (!cells || cells.length === 0) {
    return (
      <div style={{ width: cellSize * 3, height: cellSize * 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 10, color: '#c8c4bc' }}>—</span>
      </div>
    )
  }
  const maxR = Math.max(...cells.map(([r]) => r))
  const maxC = Math.max(...cells.map(([, c]) => c))
  const set = new Set(cells.map(([r, c]) => `${r},${c}`))
  const color = PIECE_COLORS[colorIdx] || PIECE_COLORS[0]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${maxC + 1}, ${cellSize}px)`, gap: 2 }}>
      {Array.from({ length: maxR + 1 }, (_, r) =>
        Array.from({ length: maxC + 1 }, (_, c) => (
          <div key={`${r}-${c}`} style={{
            width: cellSize, height: cellSize, borderRadius: 3,
            background: set.has(`${r},${c}`) ? color : 'transparent',
          }} />
        ))
      )}
    </div>
  )
}

export default PieceMini
