import { useBoardStore } from '../store/boardStore'
import { usePiecesStore } from '../store/piecesStore'
import { useScoreStore } from '../store/scoreStore'
import { solve } from '../solver/engine'
import { placeOnBoard, clearLines } from '../solver/boardUtils'
import { cloneBoard } from '../solver/boardUtils'
import { scoreBoard } from '../solver/heuristic'

export const useSolver = () => {
  const { board, setBoard } = useBoardStore()
  const { pieces, clearAllPieces } = usePiecesStore()
  const { addScore, setStatus } = useScoreStore()

  const handleSolve = async () => {
    const active = pieces.filter((p) => p && p.cells && p.cells.length > 0)
    if (active.length === 0) {
      setStatus('กรุณาวาดชิ้นส่วนก่อน (อย่างน้อย 1 ชิ้น)')
      return
    }

    setStatus('กำลังคำนวณ...')
    await new Promise((r) => setTimeout(r, 30))

    const solution = solve(board, pieces)
    if (!solution) {
      setStatus('ไม่สามารถวางชิ้นส่วนได้ ลองเคลียร์กระดานหรือเปลี่ยนชิ้นส่วน')
      return
    }

    let finalBoard = cloneBoard(board)
    let gainedScore = 0
    let gainedLines = 0

    for (const step of solution.steps) {
      const piece = solution.activePieces[step.pieceIdx]
      finalBoard = placeOnBoard(finalBoard, piece, step.row, step.col, step.pieceIdx + 1)
      const { board: cl, linesCleared } = clearLines(finalBoard)
      finalBoard = cl
      gainedScore += scoreBoard(cl, linesCleared)
      gainedScore += piece.cells.length * 10
      gainedLines += linesCleared
    }

    setBoard(finalBoard)
    clearAllPieces()
    addScore(Math.max(0, gainedScore), gainedLines)
    setStatus(
      `วางชิ้นส่วนได้ ${solution.steps.length} ชิ้น | ล้าง ${gainedLines} เส้น | +${Math.max(0, gainedScore)} คะแนน`
    )
  }

  return { handleSolve }
}
