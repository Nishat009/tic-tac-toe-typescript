'use client';

import { Provider } from 'react-redux';
import Navbar from '@/components/Navbar';
import Game from '@/components/Game';
import { store } from '../store';

export default function GamePage() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Game />
      </div>
    </Provider>
  );
}