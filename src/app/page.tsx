'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PlayerSetup from '@/components/PlayerSetup';
import Navbar from '@/components/Navbar';
import { persistor, store } from './store';

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <Navbar />
          <PlayerSetup />
        </div>
      </PersistGate>
    </Provider>
  );
}
