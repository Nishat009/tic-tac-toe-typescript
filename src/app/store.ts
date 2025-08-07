'use client';

import { 
  configureStore, 
  combineReducers, 
  PayloadAction, 
  createSlice  // <-- Add this import here
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// --- Types ---
interface Players {
  player1: string;
  player2: string;
}

type CellValue = '' | 'X' | 'O';

type Board = CellValue[][];

interface GameState {
  players: Players;
  currentPlayer: CellValue;
  board: Board;
  round: number;
  roundWins: { player1: number; player2: number };
  scores: { player1: number; player2: number };
  winner: string | null;
}

interface LeaderboardEntry {
  player1: string;
  player2: string;
  winner: string;
  round: number;
}

interface LeaderboardState {
  leaderboard: LeaderboardEntry[];
}

// --- Initial States ---
const initialGameState: GameState = {
  players: { player1: '', player2: '' },
  currentPlayer: 'X',
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  round: 1,
  roundWins: { player1: 0, player2: 0 },
  scores: { player1: 0, player2: 0 },
  winner: null,
};

const initialLeaderboardState: LeaderboardState = {
  leaderboard: [],
};

// --- Game Slice ---
const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    setPlayers(state, action: PayloadAction<Players>) {
      state.players = action.payload;
    },
    makeMove(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;
      if (state.board[row][col] === '' && !state.winner) {
        state.board[row][col] = state.currentPlayer;
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      }
    },
    checkWinner(state) {
      const b = state.board;
      const lines = [
        [b[0][0], b[0][1], b[0][2]],
        [b[1][0], b[1][1], b[1][2]],
        [b[2][0], b[2][1], b[2][2]],
        [b[0][0], b[1][0], b[2][0]],
        [b[0][1], b[1][1], b[2][1]],
        [b[0][2], b[1][2], b[2][2]],
        [b[0][0], b[1][1], b[2][2]],
        [b[0][2], b[1][1], b[2][0]],
      ];

      for (const line of lines) {
        if (line[0] && line[0] === line[1] && line[1] === line[2]) {
          const roundWinner = line[0] === 'X' ? state.players.player1 : state.players.player2;
          state.winner = roundWinner;

          const winnerKey = roundWinner === state.players.player1 ? 'player1' : 'player2';
          const loserKey = winnerKey === 'player1' ? 'player2' : 'player1';

          state.roundWins[winnerKey] += 1;
          state.scores[winnerKey] += 2;
          state.scores[loserKey] += 1;

          return;
        }
      }

      if (state.board.flat().every(cell => cell !== '')) {
        state.winner = 'Draw';
      }
    },
    nextRound(state) {
      state.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      state.currentPlayer = 'X';
      state.winner = null;
      state.round += 1;
    },
    resetGame(state) {
      state.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      state.currentPlayer = 'X';
      state.winner = null;
      state.round = 1;
      state.roundWins = { player1: 0, player2: 0 };
      state.scores = { player1: 0, player2: 0 };
    },
    resetBoardOnly(state) {
      state.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      state.currentPlayer = 'X';
      state.winner = null;
    },
  },
});

// --- Leaderboard Slice ---
const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: initialLeaderboardState,
  reducers: {
    addToLeaderboard(state, action: PayloadAction<LeaderboardEntry | LeaderboardEntry[]>) {
      if (Array.isArray(action.payload)) {
        state.leaderboard.push(...action.payload);
      } else {
        state.leaderboard.push(action.payload);
      }
    },
    resetLeaderboard(state) {
      state.leaderboard = [];
    },
  },
});

// --- Combine Reducers ---
const rootReducer = combineReducers({
  game: gameSlice.reducer,
  leaderboard: leaderboardSlice.reducer,
});

// --- Persist Config ---
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['leaderboard'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- Store ---
// <--- Add getDefaultMiddleware import above and use it here --->

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor = persistStore(store);

// --- Action Exports ---
export const {
  setPlayers,
  makeMove,
  checkWinner,
  nextRound,
  resetGame,
  resetBoardOnly,
} = gameSlice.actions;

export const {
  addToLeaderboard,
  resetLeaderboard,
} = leaderboardSlice.actions;

// --- Root State & Dispatch Types ---
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
