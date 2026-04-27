import { ROWS, COLS, countEmpty } from './boardUtils';

export const scoreBoard = (board, linesCleared, totalPiecesPlaced) => {
  let score = 0;

  // รางวัลหลัก: ล้างแถว/คอลัมน์
  score += linesCleared * 1000;
  score += linesCleared > 1 ? linesCleared * linesCleared * 500 : 0;

  // รางวัล: ช่องว่างเหลือน้อย = ดี
  const empty = countEmpty(board);
  score -= empty * 2;

  // รางวัล: ความต่อเนื่องของแถว (แถวที่เกือบเต็ม)
  for (let r = 0; r < ROWS; r++) {
    const filled = board[r].filter((c) => c !== 0).length;
    if (filled >= 8) score += (filled - 7) * 50;
  }

  // รางวัล: ความต่อเนื่องของคอลัมน์
  for (let c = 0; c < COLS; c++) {
    const filled = board.filter((row) => row[c] !== 0).length;
    if (filled >= 8) score += (filled - 7) * 50;
  }

  // ลงโทษ: ช่องว่างที่โดดเดี่ยว (isolated holes)
  score -= countIsolatedHoles(board) * 30;

  // รางวัล: block อยู่ชิดกัน (density)
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