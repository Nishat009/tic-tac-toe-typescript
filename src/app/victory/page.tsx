'use client';

import Navbar from '@/components/Navbar';
import VictoryScreen from '@/components/VictoryScreen';
import { Provider } from 'react-redux';
import { store } from '../store';


export default function VictoryPage() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <VictoryScreen />
      </div>
    </Provider>
  );
}