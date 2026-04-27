import { create } from 'zustand'
import {
  createEmptyBoard,
  cloneBoard,
  canPlace,
  placeOnBoard,
  clearLines,
} from '../solver/boardUtils'

import {
  PRESETS,
  PIECE_COLORS,
} from '../components/pieces/Presets'

import { solve } from '../solver/engine'

const randColor = () =>
  PIECE_COLORS[
    Math.floor(Math.random() * PIECE_COLORS.length)
  ]

const spawnPieces = () => {
  const shuffled = [...PRESETS]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  return shuffled.map((p) => ({
    cells: p.cells.map((c) => [...c]),
    color: randColor(),
    name: p.name,
  }))
}

export const useGameStore = create((set, get) => ({
  board: createEmptyBoard(),
  pieces: spawnPieces(),

  selectedIdx: null,
  dragIdx: null,
  dragOffset: null,
  hoverPos: null,

  score: 0,
  best: 0,
  lines: 0,

  aiHint: null,
  gameOver: false,

  status:
    'Drag pieces onto the board or press AI Help.',

  // Click to select piece
  selectPiece: (idx) =>
    set((s) => ({
      selectedIdx:
        s.selectedIdx === idx ? null : idx,
      hoverPos: null,
      aiHint: null,
    })),

  // Start dragging piece
  startDrag: (pieceIdx, offsetDr, offsetDc) =>
    set({
      dragIdx: pieceIdx,
      dragOffset: {
        dr: offsetDr,
        dc: offsetDc,
      },
      selectedIdx: pieceIdx,
      hoverPos: null,
      aiHint: null,
    }),

  endDrag: () =>
    set({
      dragIdx: null,
      dragOffset: null,
    }),

  setHover: (pos) =>
    set({
      hoverPos: pos,
    }),

  placePiece: (row, col) => {
    const {
      board,
      pieces,
      selectedIdx,
      score,
      best,
      lines,
    } = get()

    if (selectedIdx === null) return

    const piece = pieces[selectedIdx]

    if (!piece) return

    if (!canPlace(board, piece, row, col)) {
      set({
        status:
          'Cannot place the piece here.',
      })
      return
    }

    const colorId = selectedIdx + 2

    let newBoard = placeOnBoard(
      board,
      piece,
      row,
      col,
      colorId
    )

    const {
      board: cleared,
      linesCleared,
    } = clearLines(newBoard)

    newBoard = cleared

    const gained =
      piece.cells.length * 10 +
      linesCleared *
        linesCleared *
        80

    const newScore = score + gained
    const newLines = lines + linesCleared

    const newPieces = pieces.map((p, i) =>
      i === selectedIdx ? null : p
    )

    const allUsed = newPieces.every(
      (p) => p === null
    )

    const nextPieces = allUsed
      ? spawnPieces()
      : newPieces

    const gameOver =
      !allUsed &&
      !hasAnyMove(newBoard, nextPieces)

    set({
      board: newBoard,
      pieces: nextPieces,

      selectedIdx: null,
      dragIdx: null,
      dragOffset: null,
      hoverPos: null,
      aiHint: null,

      score: newScore,
      best: Math.max(newScore, best),
      lines: newLines,

      status:
        linesCleared > 0
          ? `Cleared ${linesCleared} lines! +${gained} points`
          : `+${gained} points`,

      gameOver,
    })
  },

  runAI: () => {
    const { board, pieces } = get()

    const active = pieces.filter(Boolean)

    if (active.length === 0) return

    set({
      status: 'AI is thinking...',
    })

    setTimeout(() => {
      const piecesWithIdx = pieces
        .map((p, i) =>
          p
            ? {
                ...p,
                origIdx: i,
              }
            : null
        )
        .filter(Boolean)

      const solution = solve(
        board,
        piecesWithIdx
      )

      if (!solution) {
        set({
          status:
            'AI: No valid move found.',
        })
        return
      }

      const hints = solution.steps.map(
        (s) => ({
          pieceIdx:
            piecesWithIdx[s.pieceIdx]
              .origIdx,
          row: s.row,
          col: s.col,
        })
      )

      set({
        aiHint: hints,
        status: `AI suggests ${hints.length} moves — press "Apply AI" to confirm.`,
      })
    }, 30)
  },

  applyAI: () => {
    const {
      board,
      pieces,
      aiHint,
      score,
      best,
      lines,
    } = get()

    if (!aiHint) return

    let b = cloneBoard(board)
    let ps = [...pieces]
    let sc = score
    let ln = lines

    for (const hint of aiHint) {
      const piece =
        ps[hint.pieceIdx]

      if (
        !piece ||
        !canPlace(
          b,
          piece,
          hint.row,
          hint.col
        )
      ) {
        continue
      }

      b = placeOnBoard(
        b,
        piece,
        hint.row,
        hint.col,
        hint.pieceIdx + 2
      )

      const {
        board: cleared,
        linesCleared,
      } = clearLines(b)

      b = cleared

      sc +=
        piece.cells.length * 10 +
        linesCleared *
          linesCleared *
          80

      ln += linesCleared

      ps[hint.pieceIdx] = null
    }

    const allUsed = ps.every(
      (p) => p === null
    )

    const nextPieces = allUsed
      ? spawnPieces()
      : ps

    const gameOver =
      !allUsed &&
      !hasAnyMove(b, nextPieces)

    set({
      board: b,
      pieces: nextPieces,

      selectedIdx: null,
      aiHint: null,

      score: sc,
      best: Math.max(sc, best),
      lines: ln,

      status:
        'AI placed the pieces.',
      gameOver,
    })
  },

  newGame: () =>
    set({
      board: createEmptyBoard(),
      pieces: spawnPieces(),

      selectedIdx: null,
      dragIdx: null,
      dragOffset: null,
      hoverPos: null,

      aiHint: null,

      score: 0,
      lines: 0,

      status:
        'Drag pieces onto the board or press AI Help.',

      gameOver: false,
    }),
}))

function hasAnyMove(board, pieces) {
  return pieces
    .filter(Boolean)
    .some((p) =>
      Array.from(
        { length: 8 },
        (_, r) => r
      ).some((r) =>
        Array.from(
          { length: 8 },
          (_, c) => c
        ).some((c) =>
          canPlace(
            board,
            p,
            r,
            c
          )
        )
      )
    )
}