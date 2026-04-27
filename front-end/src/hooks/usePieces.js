import { usePiecesStore } from '../store/piecesStore'
import { useScoreStore } from '../store/scoreStore'

export const usePieces = () => {
  const {
    pieces,
    selectedPieceIdx,
    setSelectedPiece,
    togglePieceCell,
    setPiece,
    clearPiece,
    clearAllPieces,
    randomPieces,
  } = usePiecesStore()

  const { setStatus } = useScoreStore()

  const handleRandomPieces = () => {
    randomPieces()
    setStatus('สุ่มชิ้นส่วนใหม่แล้ว')
  }

  const activePiecesCount = pieces.filter((p) => p.cells.length > 0).length

  return {
    pieces,
    selectedPieceIdx,
    setSelectedPiece,
    togglePieceCell,
    setPiece,
    clearPiece,
    clearAllPieces,
    handleRandomPieces,
    activePiecesCount,
  }
}
