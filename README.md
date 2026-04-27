
# AI Block Blast Master — Project Structure

```
front-end/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/                  # รูป, icon, font
│   │
│   ├── components/              # UI Components (แยกชัด debug ง่าย)
│   │   ├── board/
│   │   │   ├── BoardGrid.jsx        # กระดาน 10x10 render
│   │   │   ├── BoardCell.jsx        # แต่ละช่องบน board
│   │   │   └── BoardGrid.css
│   │   │
│   │   ├── pieces/
│   │   │   ├── PieceSlot.jsx        # slot วาง block 1 ชิ้น
│   │   │   ├── PieceBuilder.jsx     # builder สร้าง shape เอง
│   │   │   ├── PiecePreview.jsx     # preview block ก่อนวาง
│   │   │   └── PieceSlot.css
│   │   │
│   │   ├── solver/
│   │   │   ├── SolverPanel.jsx      # panel แสดงผล solution
│   │   │   ├── SolutionStep.jsx     # แต่ละ step ของ solution
│   │   │   └── SolverPanel.css
│   │   │
│   │   ├── upload/
│   │   │   ├── ScreenshotUpload.jsx # Mode ① drag & drop upload
│   │   │   └── ScreenshotUpload.css
│   │   │
│   │   └── ui/                  # shared UI components
│   │       ├── Button.jsx
│   │       ├── Modal.jsx
│   │       └── Toast.jsx
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useBoard.js          # จัดการ board state (toggle cell)
│   │   ├── usePieces.js         # จัดการ 3 pieces
│   │   ├── useSolver.js         # เรียก solver + จัดการผลลัพธ์
│   │   └── useVision.js         # เรียก Vision API (Mode ①)
│   │
│   ├── solver/                  # 🧠 Core Algorithm (ไม่มี UI)
│   │   ├── engine.js            # brute-force solver หลัก
│   │   ├── heuristic.js         # scoring function (แถวล้าง, density)
│   │   ├── boardUtils.js        # canPlace, clearLines, cloneBoard
│   │   └── solver.test.js       # unit test
│   │
│   ├── vision/                  # 👁 Screenshot Parser
│   │   ├── visionApi.js         # เรียก Claude/Gemini Vision API
│   │   ├── boardParser.js       # แปลง API response → board array
│   │   └── prompts.js           # prompt templates สำหรับ Vision
│   │
│   ├── store/                   # Global State (Zustand)
│   │   ├── boardStore.js        # board state
│   │   ├── piecesStore.js       # pieces state
│   │   └── solverStore.js       # solution state
│   │
│   ├── pages/                   # หน้าหลัก
│   │   ├── ManualPage.jsx       # Mode ② วาดเอง
│   │   └── UploadPage.jsx       # Mode ① upload screenshot
│   │
│   ├── App.jsx                  # routing หลัก
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── .env.example                 # template สำหรับ API keys
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## โฟลเดอร์สำคัญ — debug ง่าย

| โฟลเดอร์ | หน้าที่ | debug เมื่อ |
|---|---|---|
| `src/solver/` | algorithm ล้วนๆ ไม่มี UI | solver ให้คำตอบผิด |
| `src/components/board/` | render board | board แสดงผลผิด |
| `src/components/pieces/` | render & build pieces | piece สร้างไม่ได้ |
| `src/hooks/` | logic เชื่อม UI กับ store | state ไม่ update |
| `src/store/` | global state | ข้อมูลหายข้ามหน้า |
| `src/vision/` | Vision API | screenshot อ่านไม่ได้ |

---

## ลำดับสร้างไฟล์ (Phase 1 — Manual Mode)

```
1. src/solver/boardUtils.js      ← utility functions ก่อน
2. src/solver/heuristic.js       ← scoring logic
3. src/solver/engine.js          ← solver หลัก
4. src/store/boardStore.js       ← state
5. src/store/piecesStore.js      ← state
6. src/hooks/useBoard.js         ← hook
7. src/hooks/usePieces.js        ← hook
8. src/components/board/         ← UI board
9. src/components/pieces/        ← UI pieces
10. src/components/solver/       ← UI solution
11. src/pages/ManualPage.jsx     ← ประกอบทุกอย่าง
12. src/App.jsx                  ← routing
```

---

## Package ที่ต้องติดตั้งเพิ่ม

```bash
npm install zustand react-router-dom
```

Vision mode (ทีหลัง):
```bash
npm install @anthropic-ai/sdk
```