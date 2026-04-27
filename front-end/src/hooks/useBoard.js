import { useBoardStore } from '../store/boardStore'
import { useScoreStore } from '../store/scoreStore'

export const useBoard = () => {
  const { board, toggleCell, setBoard, clearBoard, randomBoard } = useBoardStore()
  const { setStatus } = useScoreStore()

  const handleToggleCell = (row, col) => {
    toggleCell(row, col)
  }

  const handleClearBoard = () => {
    clearBoard()
    setStatus('ล้างกระดานแล้ว')
  }

  const handleRandomBoard = () => {
    randomBoard()
    setStatus('สุ่มกระดานใหม่แล้ว')
  }

  const filledCount = board.flat().filter((c) => c !== 0).length
  const fillPercent = Math.round((filledCount / 64) * 100)

  return {
    board,
    handleToggleCell,
    handleClearBoard,
    handleRandomBoard,
    setBoard,
    filledCount,
    fillPercent,
  }
}
