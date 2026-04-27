export const ROWS = 8;
export const COLS = 8;

export const createEmptyBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0));

export const cloneBoard = (board) =>
  board.map((row) => [...row]);

export const canPlace = (board, piece, row, col) => {
  return piece.cells.every(([dr, dc]) => {
    const r = row + dr;
    const c = col + dc;
    return r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === 0;
  });
};

export const placeOnBoard = (board, piece, row, col, colorId = 1) => {
  const next = cloneBoard(board);
  piece.cells.forEach(([dr, dc]) => {
    next[row + dr][col + dc] = colorId;
  });
  return next;
};

export const clearLines = (board) => {
  let next = cloneBoard(board);
  let clearedRows = [];
  let clearedCols = [];

  for (let r = 0; r < ROWS; r++) {
    if (next[r].every((c) => c !== 0)) clearedRows.push(r);
  }
  for (let c = 0; c < COLS; c++) {
    if (next.every((row) => row[c] !== 0)) clearedCols.push(c);
  }

  clearedRows.forEach((r) => {
    next[r] = Array(COLS).fill(0);
  });
  clearedCols.forEach((c) => {
    next.forEach((row) => (row[c] = 0));
  });

  return {
    board: next,
    clearedRows,
    clearedCols,
    linesCleared: clearedRows.length + clearedCols.length,
  };
};

export const countEmpty = (board) =>
  board.flat().filter((c) => c === 0).length;

export const countFilled = (board) =>
  board.flat().filter((c) => c !== 0).length;

export const getBoardHash = (board) =>
  board.map((row) => row.join('')).join('|');