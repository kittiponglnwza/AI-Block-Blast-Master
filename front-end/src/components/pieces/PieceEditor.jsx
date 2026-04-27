import React, { useState } from 'react'
import { usePieces } from '../../hooks/usePieces'
import { PRESETS, PIECE_COLORS } from './Presets'
import styles from './PieceEditor.module.css'

const GRID_SIZE = 5

const PresetThumb = ({
  preset,
  colorIdx,
  onClick,
}) => {
  const cells = preset.cells

  const maxR = Math.max(
    ...cells.map(([r]) => r)
  )

  const maxC = Math.max(
    ...cells.map(([, c]) => c)
  )

  const cellSet = new Set(
    cells.map(
      ([r, c]) => `${r},${c}`
    )
  )

  const color =
    PIECE_COLORS[colorIdx]

  const size = 9

  return (
    <button
      className={styles.thumbBtn}
      onClick={onClick}
      title={preset.name}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${maxC + 1}, ${size}px)`,
          gap: 1,
        }}
      >
        {Array.from(
          { length: maxR + 1 },
          (_, r) =>
            Array.from(
              { length: maxC + 1 },
              (_, c) => (
                <div
                  key={`${r}-${c}`}
                  style={{
                    width: size,
                    height: size,
                    borderRadius: 2,
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

      <span
        className={styles.thumbLabel}
      >
        {preset.name}
      </span>
    </button>
  )
}

const PieceEditor = () => {
  const {
    pieces,
    selectedPieceIdx,
    togglePieceCell,
    setPiece,
    clearPiece,
  } = usePieces()

  const [showPresets, setShowPresets] =
    useState(false)

  const piece =
    pieces[selectedPieceIdx]

  const color =
    PIECE_COLORS[selectedPieceIdx]

  const cellSet = new Set(
    piece.cells.map(
      ([r, c]) => `${r},${c}`
    )
  )

  return (
    <div className={styles.wrapper}>
      <div
        className={
          styles.editorRow
        }
      >
        <div className={styles.grid}>
          {Array.from(
            { length: GRID_SIZE },
            (_, r) =>
              Array.from(
                {
                  length:
                    GRID_SIZE,
                },
                (_, c) => {
                  const active =
                    cellSet.has(
                      `${r},${c}`
                    )

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={
                        styles.cell
                      }
                      style={{
                        background:
                          active
                            ? color
                            : '#ede9e3',
                        borderColor:
                          active
                            ? color
                            : '#e0dbd3',
                      }}
                      onClick={() =>
                        togglePieceCell(
                          selectedPieceIdx,
                          r,
                          c
                        )
                      }
                    />
                  )
                }
              )
          )}
        </div>

        <div
          className={
            styles.controls
          }
        >
          <button
            className={`${styles.ctrlBtn} ${
              showPresets
                ? styles.active
                : ''
            }`}
            onClick={() =>
              setShowPresets(
                (v) => !v
              )
            }
          >
            {showPresets
              ? '✕ Close'
              : '⊞ Preset'}
          </button>

          <button
            className={
              styles.ctrlBtn
            }
            onClick={() =>
              clearPiece(
                selectedPieceIdx
              )
            }
          >
            ✕ Clear
          </button>
        </div>
      </div>

      {showPresets && (
        <div
          className={
            styles.presetPanel
          }
        >
          <div
            className={
              styles.presetGrid
            }
          >
            {PRESETS.map(
              (
                preset,
                i
              ) => (
                <PresetThumb
                  key={i}
                  preset={
                    preset
                  }
                  colorIdx={
                    selectedPieceIdx
                  }
                  onClick={() => {
                    setPiece(
                      selectedPieceIdx,
                      preset.cells
                    )

                    setShowPresets(
                      false
                    )
                  }}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PieceEditor