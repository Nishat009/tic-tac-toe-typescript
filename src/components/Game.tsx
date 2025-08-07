'use client';

import { useSelector, useDispatch } from 'react-redux';
import { makeMove, checkWinner, nextRound, resetBoardOnly } from '@/app/store';
import { addToLeaderboard } from '@/app/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

export default function Game() {
  const hasMounted = useHasMounted();
  const dispatch = useDispatch();
  const router = useRouter();

  const { board, currentPlayer, players, winner, round, roundWins, scores } = useSelector((state) => state.game);

  useEffect(() => {
    if (winner && (roundWins?.player1 >= 3 || roundWins?.player2 >= 3 || round > 5)) {
      try {
        dispatch(nextRound());
        router.push('/victory');
      } catch (error) {
        console.error("Error navigating to victory screen:", error);
      }
    }
  }, [winner, roundWins, round, router, dispatch]);

  useEffect(() => {
    if (winner) {
      const p1Name = players.player1 || 'Player 1';
      const p2Name = players.player2 || 'Player 2';

      dispatch(
        addToLeaderboard([
          { name: p1Name, score: scores.player1 },
          { name: p2Name, score: scores.player2 },
        ])
      );
    }
  }, [winner, players, scores, dispatch]);

  const handleClick = (row, col) => {
    if (!board[row][col] && !winner) {
      try {
        dispatch(makeMove({ row, col }));
        dispatch(checkWinner());
      } catch (error) {
        console.error("Error making move or checking winner:", error);
      }
    }
  };

  return (
    <div className="min-h-screen mx-auto bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {hasMounted && (
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
          Tic-Tac-Toe - Round {round ?? '?'}
        </h2>
      )}
      <p className="text-center mb-4 text-xl text-emerald-100">
        Current Player: {currentPlayer === 'X' ? players?.player1 : players?.player2} ({currentPlayer ?? 'N/A'})
      </p>
      <div className="grid grid-cols-3 gap-2 w-full max-w-xs mx-auto backdrop-blur-sm">
        {board?.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              disabled={cell !== '' || winner}
              className=" aspect-square bg-white/20 backdrop-blur-sm rounded-xl border border-white/30
        flex items-center justify-center text-4xl md:text-5xl font-bold
        transition-all duration-300 transform hover:scale-105 active:scale-95 hover:bg-white/30"
            >
              {cell}
            </button>
          ))
        )}
      </div>
      {winner && (
        <div className="text-center mt-6">
          <p className="text-xl font-bold text-white">
            {winner === 'Draw' ? "It's a Draw!" : `Round Winner: ${winner}`}
          </p>
          <button
            onClick={() => {
              try {
                dispatch(nextRound());
              } catch (error) {
                console.error("Error starting next round:", error);
              }
            }}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Next Round
          </button>
        </div>
      )}
       <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => {
            try {
              dispatch(resetBoardOnly());
            } catch (error) {
              console.error("Error resetting the board:", error);
            }
          }}
          className="bg-gradient-to-br px-4 py-2 rounded text-white from-yellow-400/80 to-orange-400/80 animate-pulse-winner border-yellow-400/50"
        >
          Reset Round
        </button>
      </div>
    </div>
  );
}
