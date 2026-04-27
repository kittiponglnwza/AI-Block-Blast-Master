import React from 'react';

const PIECE_COLORS = [
  'transparent',
  '#f0436a',  // 1 - red
  '#2de08a',  // 2 - green
  '#38bdf8',  // 3 - blue
  '#f4c542',  // 4 - gold
  '#c084fc',  // 5 - purple
  '#fb923c',  // 6 - orange
];

const BoardCell = ({ value, isHighlight, highlightColor, isPreview, onClick, onMouseEnter }) => {
  const color = PIECE_COLORS[value] || '#ffffff';

  let bg, border, shadow;

  if (isHighlight) {
    bg = isPreview
      ? 'rgba(124,92,252,0.25)'
      : (highlightColor || '#7c5cfc');
    border = isPreview
      ? '1px dashed rgba(124,92,252,0.7)'
      : `1px solid ${highlightColor || '#7c5cfc'}`;
    shadow = isPreview
      ? 'none'
      : `0 0 8px ${highlightColor || '#7c5cfc'}88, inset 0 1px 0 rgba(255,255,255,0.2)`;
  } else if (value) {
    bg = color;
    border = `1px solid ${color}99`;
    shadow = `0 0 6px ${color}55, inset 0 1px 0 rgba(255,255,255,0.15)`;
  } else {
    bg = 'rgba(255,255,255,0.02)';
    border = '1px solid rgba(61,55,96,0.4)';
    shadow = 'none';
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={{
        width: '100%',
        aspectRatio: '1',
        background: bg,
        border,
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.08s ease',
        boxShadow: shadow,
        opacity: isHighlight && !isPreview ? 0.85 : 1,
        transform: value ? 'scale(0.96)' : 'scale(1)',
        position: 'relative',
      }}
    />
  );
};

export default React.memo(BoardCell);