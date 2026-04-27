import { useBoardStore } from '../store/boardStore'
import { usePiecesStore } from '../store/piecesStore'
import { useScoreStore } from '../store/scoreStore'
import { solve } from '../solver/engine'
import { placeOnBoard, clearLines, cloneBoard, canPlace, ROWS, COLS } from '../solver/boardUtils'
import { scoreBoard } from '../solver/heuristic'

const normalizePiece = (piece) => {
  if (!piece || piece.cells.length === 0) return piece

  const minR = Math.min(...piece.cells.map(([r]) => r))
  const minC = Math.min(...piece.cells.map(([, c]) => c))

  return {
    cells: piece.cells.map(([r, c]) => [r - minR, c - minC]),
  }
}

const getValidPositions = (board, piece) => {
  const positions = []

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (canPlace(board, piece, r, c)) {
        // Mark all cells of this placement
        piece.cells.forEach(([dr, dc]) => {
          positions.push([r + dr, c + dc])
        })
      }
    }
  }

  // Remove duplicates
  const seen = new Set()

  return positions.filter(([r, c]) => {
    const key = `${r},${c}`

    if (seen.has(key)) return false

    seen.add(key)
    return true
  })
}

const countPlacements = (board, piece) => {
  let count = 0

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (canPlace(board, piece, r, c)) count++
    }
  }

  return count
}

export const useSolver = () => {
  const { board, setBoard } = useBoardStore()
  const { pieces, clearAllPieces } = usePiecesStore()
  const { addScore, setStatus } = useScoreStore()

  const getPlan = () => {
    const normalizedPieces = pieces.map(normalizePiece)

    const active = normalizedPieces.filter(
      (p) => p && p.cells && p.cells.length > 0
    )

    if (active.length === 0) return null

    const placements = active.map((p, i) => ({
      pieceIdx: i,
      count: countPlacements(board, p),
      validCells: getValidPositions(board, p),
      pieceCells: p.cells,
    }))

    return {
      placements,
      permutations: factorial(active.length),
      activeCount: active.length,
      board,
    }
  }

  const handleSolve = async () => {
    const normalizedPieces = pieces.map(normalizePiece)

    const active = normalizedPieces.filter(
      (p) => p && p.cells && p.cells.length > 0
    )

    if (active.length === 0) {
      setStatus('Please draw at least one piece first.')
      return
    }

    setStatus('Calculating...')
    await new Promise((r) => setTimeout(r, 60))

    const solution = solve(board, normalizedPieces)

    if (!solution) {
      setStatus('Unable to place pieces. Try clearing the board or changing pieces.')
      return
    }

    let finalBoard = cloneBoard(board)
    let gainedScore = 0
    let gainedLines = 0

    for (const step of solution.steps) {
      const piece = solution.activePieces[step.pieceIdx]

      finalBoard = placeOnBoard(
        finalBoard,
        piece,
        step.row,
        step.col,
        step.pieceIdx + 1
      )

      const { board: clearedBoard, linesCleared } = clearLines(finalBoard)

      finalBoard = clearedBoard
      gainedScore += scoreBoard(clearedBoard, linesCleared)
      gainedScore += piece.cells.length * 10
      gainedLines += linesCleared
    }

    setBoard(finalBoard)
    clearAllPieces()
    addScore(Math.max(0, gainedScore), gainedLines)

    setStatus(
      `Placed ${solution.steps.length} pieces · Cleared ${gainedLines} lines · +${Math.max(
        0,
        gainedScore
      )} points`
    )
  }

  return { handleSolve, getPlan }
}

const factorial = (n) => {
  let result = 1

  for (let i = 2; i <= n; i++) result *= i

  return result
}