'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/store';
import { resetLeaderboard } from '@/app/store';

export default function Leaderboard() {
  const dispatch = useDispatch<AppDispatch>();

  // typed selector for leaderboard array
  const leaderboard = useSelector(
    (state: RootState) => state.leaderboard.leaderboard
  );

  return (
    <div className="min-h-screen mx-auto bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent leading-24 text-center">
        Leaderboard
      </h2>

      <button
        onClick={() => dispatch(resetLeaderboard())}
        className="mb-6 mx-auto bg-gradient-to-br px-4 py-2 rounded text-white from-yellow-400/80 to-orange-400/80 animate-pulse-winner border-yellow-400/50 block"
      >
        Reset Leaderboard
      </button>

      <div className="bg-white p-4 rounded shadow max-w-md mx-auto">
        {leaderboard.length === 0 ? (
          <p className="text-center">No scores yet!</p>
        ) : (
          <ul className="space-y-3">
            {leaderboard
              .filter(entry => entry.player1 && entry.player2 && entry.winner) // only complete entries
              .slice()
              .sort((a, b) => b.round - a.round)
              .map((entry, index) => (
                <li key={index} className="flex justify-between border-b border-gray-300 py-2">
                  <div>
                    <strong>Round {entry.round}:</strong> {entry.player1} vs {entry.player2}
                  </div>
                  <div>
                    Winner: <span className="font-semibold">{entry.winner}</span>
                  </div>
                </li>
              ))}

          </ul>
        )}
      </div>
    </div>
  );
}
