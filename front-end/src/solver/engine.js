import { ROWS, COLS, canPlace, placeOnBoard, clearLines, cloneBoard } from './boardUtils';
import { scoreBoard } from './heuristic';

// หา solution ดีที่สุดสำหรับ pieces ทั้ง 3 ชิ้น
export const solve = (board, pieces) => {
  const activePieces = pieces.filter((p) => p && p.cells && p.cells.length > 0);
  if (activePieces.length === 0) return null;

  let bestScore = -Infinity;
  let bestSolution = null;

  // ลอง permutation ทุกลำดับการวาง
  const permutations = getPermutations(activePieces.map((_, i) => i));

  for (const order of permutations) {
    const result = solveOrdered(board, activePieces, order);
    if (result && result.score > bestScore) {
      bestScore = result.score;
      bestSolution = result;
    }
  }

  return bestSolution;
};

const solveOrdered = (initialBoard, pieces, order) => {
  let board = cloneBoard(initialBoard);
  const steps = [];
  let totalScore = 0;
  let totalLines = 0;

  for (const pieceIdx of order) {
    const piece = pieces[pieceIdx];
    let bestStepScore = -Infinity;
    let bestStep = null;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!canPlace(board, piece, r, c)) continue;

        const newBoard = placeOnBoard(board, piece, r, c, pieceIdx + 1);
        const { board: cleared, linesCleared } = clearLines(newBoard);
        const s = scoreBoard(cleared, linesCleared, steps.length + 1);

        if (s > bestStepScore) {
          bestStepScore = s;
          bestStep = { pieceIdx, row: r, col: c, board: cleared, linesCleared };
        }
      }
    }

    if (!bestStep) return null; // วางไม่ได้ — order นี้ใช้ไม่ได้

    board = bestStep.board;
    totalScore += bestStepScore;
    totalLines += bestStep.linesCleared;
    steps.push(bestStep);
  }

  return { steps, score: totalScore, totalLines };
};

// generate all permutations
const getPermutations = (arr) => {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const perm of getPermutations(rest)) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
};