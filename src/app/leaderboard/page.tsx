'use client';
import { Provider } from 'react-redux';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';
import { store } from '../store';

export default function LeaderboardPage() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Leaderboard />
      </div>
    </Provider>
  );
}