# Block Blast Master — AI-Powered Block Puzzle Game

A React web app that combines a playable **Block Blast** game with an AI solver.  
You can either play the game yourself with real-time AI hints, or use the standalone Board Solver to find the optimal placement for any set of pieces.

---

## What This Project Does

| Mode | Description |
|---|---|
| 🎮 **Play Game** | Play Block Blast on an 8×8 grid. Drag or click pieces to place them. Press **AI Help** to get move suggestions, or **Apply AI** to let the AI play automatically. Score updates live as lines are cleared. |
| 🧠 **Board Solver** | Manually draw any board state and define up to 3 custom pieces. Press **Solve** and the AI finds the best placement order and position for all pieces, maximizing line clears. |

The AI uses a **brute-force permutation engine** — it tries every ordering of the 3 pieces and every valid board position, scoring each outcome with a heuristic that rewards line clears, penalizes isolated holes, and prefers dense compact placements.

---

## Project Structure

```
src/
├── components/
│   ├── board/
│   │   ├── BoardGrid.jsx          # Renders the 8×8 board grid
│   │   ├── BoardGrid.module.css
│   │   ├── BoardCell.jsx          # Individual board cell
│   │   └── BoardCell.module.css
│   │
│   ├── pieces/
│   │   ├── PieceSlot.jsx          # Preview slot for one piece
│   │   ├── PieceSlot.module.css
│   │   ├── PieceEditor.jsx        # 5×5 grid to draw a custom piece
│   │   ├── PieceEditor.module.css
│   │   ├── PieceMini.jsx          # Tiny piece thumbnail
│   │   └── Presets.js             # Library of built-in piece shapes & colors
│   │
│   └── ui/
│       ├── ScoreBar.jsx           # Score / best / lines display bar
│       └── ScoreBar.module.css
│
├── hooks/
│   ├── useBoard.js                # Board state helpers (clear, random fill)
│   ├── usePieces.js               # Piece selection and editing state
│   └── useSolver.js               # Calls the solver engine; exposes handleSolve, getPlan
│
├── solver/                        # 🧠 Pure algorithm — no UI
│   ├── boardUtils.js              # canPlace, placeOnBoard, clearLines, cloneBoard
│   ├── heuristic.js               # Scoring: lines × 1000, holes penalty, adjacency bonus
│   └── engine.js                  # Brute-force solver — tries all piece permutations
│
├── store/                         # Global state (Zustand)
│   ├── boardStore.js              # Board state for Solver mode
│   ├── piecesStore.js             # Pieces state for Solver mode
│   ├── gameStore.js               # Full game state (board, pieces, score, AI hints, drag)
│   └── scoreStore.js              # Score / best / lines for Solver mode
│
├── pages/
│   ├── GamePage.jsx               # 🎮 Play mode — drag & drop, AI help, game over screen
│   ├── GamePage.module.css
│   ├── SolverPage.jsx             # 🧠 Solver mode — draw board, set pieces, run AI
│   ├── SolverPage.module.css
│   ├── MainPage.jsx               # Alternative layout (board + pieces + solve button)
│   └── MainPage.module.css
│
├── App.jsx                        # Mode selector → routes to GamePage or SolverPage
├── App.css
├── main.jsx
└── index.css
```

---

## Key Folders — Quick Debug Guide

| Folder | Responsibility | Debug when… |
|---|---|---|
| `src/solver/` | Pure algorithm, no UI | AI gives wrong or no solution |
| `src/store/gameStore.js` | Game mode state machine | Score wrong, drag broken, AI hint not applying |
| `src/store/boardStore.js` | Solver mode board state | Board doesn't update |
| `src/components/board/` | Board rendering | Grid displays incorrectly |
| `src/components/pieces/` | Piece rendering & editing | Piece editor broken or piece not showing |
| `src/hooks/` | Logic bridge between UI and store | State not syncing after action |

---

## How the AI Solver Works

```
Input: board state + up to 3 pieces

1. Generate all orderings (permutations) of the active pieces
2. For each ordering:
   a. Greedily pick the best position for each piece in sequence
   b. Score the resulting board after each placement + line clear
3. Return the ordering + positions with the highest total score

Scoring (heuristic.js):
  + 1000 × lines cleared
  + bonus for clearing multiple lines at once
  + 50 per near-full row/column (≥ 6 filled)
  + 3 per adjacent filled cell pair
  - 2 per empty cell remaining
  - 30 per isolated hole (empty cell under a filled cell)
```

---

## Getting Started

```bash
npm install
npm run dev
```

Dependencies to install if starting fresh:

```bash
npm install zustand react-router-dom
```

---

## Tech Stack

- **React** + **Vite**
- **Zustand** — global state management
- **CSS Modules** — scoped component styles
- No external UI library