'use client';

import { useSelector, useDispatch } from 'react-redux';
import { resetLeaderboard } from '@/app/store';

export default function Leaderboard() {
  const leaderboard = useSelector((state) => state.leaderboard.leaderboard);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen mx-auto bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent leading-24 text-center">Leaderboard</h2>
      <button
        onClick={() => dispatch(resetLeaderboard())}
        className="mb-4 mx-auto bg-gradient-to-br px-4 py-2 rounded text-white from-yellow-400/80 to-orange-400/80 animate-pulse-winner border-yellow-400/50 flex mb-"
      >
        Reset Leaderboard
      </button>
      <div className="bg-white p-4 rounded shadow w-92 mx-auto">
        {leaderboard.length === 0 ? (
          <p className="text-center">No scores yet!</p>
        ) : (
          <ul className="space-y-2">
            {leaderboard
              .slice()
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <li key={index} className="flex justify-between">
                  <span>{player.name || 'Unknown Player'}</span>
                  <span>{player.score || 0} points</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
