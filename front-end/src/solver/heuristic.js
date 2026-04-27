import { ROWS, COLS, countEmpty } from './boardUtils';

export const scoreBoard = (board, linesCleared, totalPiecesPlaced) => {
  let score = 0;

  score += linesCleared * 1000;
  score += linesCleared > 1 ? linesCleared * linesCleared * 500 : 0;

  const empty = countEmpty(board);
  score -= empty * 2;

  // Threshold adjusted for 8x8 (was 8 on 10x10, now 6 on 8x8)
  for (let r = 0; r < ROWS; r++) {
    const filled = board[r].filter((c) => c !== 0).length;
    if (filled >= 6) score += (filled - 5) * 50;
  }

  for (let c = 0; c < COLS; c++) {
    const filled = board.filter((row) => row[c] !== 0).length;
    if (filled >= 6) score += (filled - 5) * 50;
  }

  score -= countIsolatedHoles(board) * 30;
  score += countAdjacency(board) * 3;

  return score;
};

const countIsolatedHoles = (board) => {
  let holes = 0;
  for (let r = 1; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] === 0 && board[r - 1][c] !== 0) holes++;
    }
  }
  return holes;
};

const countAdjacency = (board) => {
  let count = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== 0) {
        if (c + 1 < COLS && board[r][c + 1] !== 0) count++;
        if (r + 1 < ROWS && board[r + 1][c] !== 0) count++;
      }
    }
  }
  return count;
};