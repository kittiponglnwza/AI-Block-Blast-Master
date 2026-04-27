import React from 'react';

const PIECE_COLORS = ['#0d1a2a', '#ff4060', '#00e676', '#00b0ff', '#ffd700', '#e040fb', '#ff8c00'];

const BoardCell = ({ value, isHighlight, highlightColor, onClick, onMouseEnter }) => {
  const bg = isHighlight
    ? highlightColor || '#00f0ff'
    : value
    ? PIECE_COLORS[value] || '#ffffff'
    : '#0d1a2a';

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={{
        width: '100%',
        aspectRatio: '1',
        background: bg,
        border: isHighlight
          ? '1px dashed rgba(255,255,255,0.6)'
          : value
          ? `1px solid ${PIECE_COLORS[value]}cc`
          : '1px solid #0f2035',
        borderRadius: '3px',
        cursor: 'pointer',
        transition: 'background 0.1s, transform 0.1s',
        boxShadow: value ? `0 0 4px ${PIECE_COLORS[value]}66` : 'none',
        opacity: isHighlight ? 0.75 : 1,
        transform: isHighlight ? 'scale(0.95)' : 'scale(1)',
      }}
    />
  );
};

export default React.memo(BoardCell);