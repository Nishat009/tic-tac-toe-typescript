'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setPlayers } from '@/app/store';

export default function PlayerSetup() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = () => {
    if (player1.trim() && player2.trim()) {
      dispatch(setPlayers({ player1, player2 }));
      router.push('/game');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent leading-24 text-center">Player Setup</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          placeholder="Player 1 Name"
          className="w-full h-12 p-2 border rounded border-slate-300 text-white placeholder:text-amber-50/60"
        />
        <input
          type="text"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          placeholder="Player 2 Name"
          className="w-full h-12 p-2 border rounded border-slate-300 text-white placeholder:text-amber-50/60"
        />
        <button
          onClick={handleSubmit}
          disabled={!player1.trim() || !player2.trim()}
          className="w-full bg-fuchsia-900 text-white p-2 rounded disabled:bg-gray-400"
        >
          Start Match
        </button>
      </div>
    </div>
  );
}