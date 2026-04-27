import React, { useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { canPlace } from '../solver/boardUtils'
import { PIECE_COLORS } from '../components/pieces/Presets'
import styles from './GamePage.module.css'

const CELL_SIZE = 44
const GAP = 3

const GamePage = () => {
  const {
    board,
    pieces,
    selectedIdx,
    dragIdx,
    dragOffset,
    hoverPos,

    score,
    best,
    lines,
    aiHint,
    gameOver,
    status,

    selectPiece,
    startDrag,
    endDrag,
    setHover,
    placePiece,

    runAI,
    applyAI,
    newGame,
  } = useGameStore()

  const boardRef = useRef(null)

  const activePieceIdx =
    dragIdx !== null
      ? dragIdx
      : selectedIdx

  const activePiece =
    activePieceIdx !== null
      ? pieces[activePieceIdx]
      : null

  const getBoardPos = (
    clientX,
    clientY
  ) => {
    if (!boardRef.current)
      return null

    const rect =
      boardRef.current.getBoundingClientRect()

    const x =
      clientX - rect.left

    const y =
      clientY - rect.top

    const step =
      CELL_SIZE + GAP

    const c = Math.floor(
      x / step
    )

    const r = Math.floor(
      y / step
    )

    if (
      r < 0 ||
      r >= 8 ||
      c < 0 ||
      c >= 8
    ) {
      return null
    }

    const anchorR =
      dragOffset
        ? r -
        dragOffset.dr
        : r

    const anchorC =
      dragOffset
        ? c -
        dragOffset.dc
        : c

    return {
      r: anchorR,
      c: anchorC,
    }
  }

  const getHoverCells = () => {
    if (
      !activePiece ||
      !hoverPos
    ) {
      return {
        cells: new Set(),
        valid: false,
      }
    }

    const {
      r,
      c,
    } = hoverPos

    const valid =
      canPlace(
        board,
        activePiece,
        r,
        c
      )

    const cells = new Set(
      activePiece.cells.map(
        ([dr, dc]) =>
          `${r + dr},${c + dc}`
      )
    )

    return { cells, valid }
  }

  const getAIHintCells = () => {
    if (!aiHint) return {}

    const map = {}

    for (const hint of aiHint) {
      const piece =
        pieces[
        hint.pieceIdx
        ]

      if (!piece) continue

      piece.cells.forEach(
        ([dr, dc]) => {
          map[
            `${hint.row + dr},${hint.col + dc}`
          ] =
            hint.pieceIdx
        }
      )
    }

    return map
  }

  const {
    cells: hoverCells,
    valid: hoverValid,
  } = getHoverCells()

  const aiCells =
    getAIHintCells()

  const getCellBg = (
    r,
    c,
    val
  ) => {
    const key = `${r},${c}`

    if (
      hoverCells.has(key)
    ) {
      return hoverValid
        ? 'rgba(74,130,180,0.5)'
        : 'rgba(200,112,74,0.4)'
    }

    if (
      aiCells[key] !==
      undefined
    ) {
      return 'rgba(200,180,80,0.8)'
    }

    if (val === 0)
      return '#f0ece6'

    if (val === 1)
      return '#7a7068'

    return PIECE_COLORS[
      (val - 2) %
      PIECE_COLORS.length
    ]
  }

  const handleBoardDragOver = (
    e
  ) => {
    e.preventDefault()

    const pos =
      getBoardPos(
        e.clientX,
        e.clientY
      )

    setHover(pos)
  }

  const handleBoardDrop = (
    e
  ) => {
    e.preventDefault()

    const pos =
      getBoardPos(
        e.clientX,
        e.clientY
      )

    if (pos) {
      placePiece(
        pos.r,
        pos.c
      )
    }

    endDrag()
  }

  const handleCellClick = (
    r,
    c
  ) => {
    if (
      dragIdx !== null
    )
      return

    if (
      activePieceIdx !==
      null
    ) {
      placePiece(r, c)
    }
  }

  const handleCellMouseEnter = (
    r,
    c
  ) => {
    if (
      dragIdx !== null
    )
      return

    if (
      activePieceIdx !==
      null
    ) {
      setHover({
        r,
        c,
      })
    }
  }

  return (
    <div className={styles.page}>
      {/* Score bar */}
      <div
        className={
          styles.scoreRow
        }
      >
        <div
          className={
            styles.stat
          }
        >
          <span
            className={
              styles.sl
            }
          >
            Score
          </span>

          <span
            className={
              styles.sv
            }
            style={{
              color:
                '#c8704a',
            }}
          >
            {score}
          </span>
        </div>

        <div
          className={
            styles.stat
          }
        >
          <span
            className={
              styles.sl
            }
          >
            Best
          </span>

          <span
            className={
              styles.sv
            }
            style={{
              color:
                '#4a82b4',
            }}
          >
            {best}
          </span>
        </div>

        <div
          className={
            styles.stat
          }
        >
          <span
            className={
              styles.sl
            }
          >
            Lines
          </span>

          <span
            className={
              styles.sv
            }
            style={{
              color:
                '#4aaa7a',
            }}
          >
            {lines}
          </span>
        </div>

        <div
          className={
            styles.statusPill
          }
        >
          {status}
        </div>
      </div>

      {/* Main layout */}
      <div
        className={
          styles.mainRow
        }
      >
        {/* Board */}
        <div
          className={
            styles.boardWrap
          }
        >
          <div
            ref={boardRef}
            className={
              styles.board
            }
            onDragOver={
              handleBoardDragOver
            }
            onDrop={
              handleBoardDrop
            }
            onMouseLeave={() =>
              setHover(
                null
              )
            }
          >
            {board.map(
              (
                row,
                r
              ) =>
                row.map(
                  (
                    val,
                    c
                  ) => (
                    <div
                      key={`${r}-${c}`}
                      className={
                        styles.cell
                      }
                      style={{
                        background:
                          getCellBg(
                            r,
                            c,
                            val
                          ),
                      }}
                      onMouseEnter={() =>
                        handleCellMouseEnter(
                          r,
                          c
                        )
                      }
                      onClick={() =>
                        handleCellClick(
                          r,
                          c
                        )
                      }
                    />
                  )
                )
            )}
          </div>
        </div>

        {/* Right panel */}
        <div
          className={
            styles.rightPanel
          }
        >
          <p
            className={
              styles.trayLabel
            }
          >
            Pieces
          </p>

          <div
            className={
              styles.tray
            }
          >
            {pieces.map(
              (
                piece,
                i
              ) => (
                <PieceTile
                  key={i}
                  piece={piece}
                  idx={i}
                  isSelected={
                    activePieceIdx ===
                    i
                  }
                  onSelect={
                    selectPiece
                  }
                  onDragStart={
                    startDrag
                  }
                  onDragEnd={
                    endDrag
                  }
                />
              )
            )}
          </div>

          <div
            className={
              styles.divider
            }
          />

          <div
            className={
              styles.btnCol
            }
          >
            <button
              className={
                styles.btnAI
              }
              onClick={
                runAI
              }
              disabled={
                gameOver
              }
            >
              AI Help
            </button>

            {aiHint && (
              <button
                className={
                  styles.btnApply
                }
                onClick={
                  applyAI
                }
              >
                Apply AI ✦
              </button>
            )}

            <button
              className={
                styles.btnNew
              }
              onClick={
                newGame
              }
            >
              New Game
            </button>
          </div>
        </div>
      </div>

      {gameOver && (
        <div
          className={
            styles.overlay
          }
        >
          <div
            className={
              styles.gameOverBox
            }
          >
            <div
              className={
                styles.goTitle
              }
            >
              Game Over
            </div>

            <div
              className={
                styles.goScore
              }
            >
              Score: {score}
            </div>

            <button
              className={
                styles.goBtn
              }
              onClick={
                newGame
              }
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* Piece tile */
const PieceTile = ({
  piece,
  idx,
  isSelected,
  onSelect,
  onDragStart,
  onDragEnd,
}) => {
  if (!piece) {
    return (
      <div
        className={`${styles.slot} ${styles.slotUsed}`}
      >
        <span
          className={
            styles.slotEmpty
          }
        >
          ✓
        </span>
      </div>
    )
  }

  const {
    cells,
    color,
  } = piece

  const maxR = Math.max(
    ...cells.map(
      ([r]) => r
    )
  )

  const maxC = Math.max(
    ...cells.map(
      ([, c]) => c
    )
  )

  const cellSet =
    new Set(
      cells.map(
        ([r, c]) =>
          `${r},${c}`
      )
    )

  const size =
    Math.min(
      18,
      Math.floor(
        80 /
        Math.max(
          maxR + 1,
          maxC + 1
        )
      )
    )

  const handleDragStart = (
    e
  ) => {
    const ghost =
      document.createElement(
        'div'
      )

    ghost.style.position =
      'absolute'

    ghost.style.top =
      '-9999px'

    document.body.appendChild(
      ghost
    )

    e.dataTransfer.setDragImage(
      ghost,
      0,
      0
    )

    setTimeout(
      () =>
        document.body.removeChild(
          ghost
        ),
      0
    )

    onDragStart(
      idx,
      0,
      0
    )
  }

  return (
    <div
      className={`${styles.slot} ${isSelected
          ? styles.slotActive
          : ''
        }`}
      draggable
      onClick={() =>
        onSelect(idx)
      }
      onDragStart={
        handleDragStart
      }
      onDragEnd={
        onDragEnd
      }
    >
      <div
        style={{
          display:
            'grid',
          gridTemplateColumns: `repeat(${maxC + 1}, ${size}px)`,
          gap: 2,
        }}
      >
        {Array.from(
          {
            length:
              maxR + 1,
          },
          (_, r) =>
            Array.from(
              {
                length:
                  maxC + 1,
              },
              (_, c) => (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width:
                      size,
                    height:
                      size,
                    borderRadius: 3,
                    background:
                      cellSet.has(
                        `${r},${c}`
                      )
                        ? color
                        : 'transparent',
                  }}
                />
              )
            )
        )}
      </div>
    </div>
  )
}

export default GamePage