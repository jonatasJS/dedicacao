'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Definir o estado inicial
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  if (isOnline) {
    return null; // Não renderiza nada se estiver online
  }

  return (
    <div className="fixed top-4 right-4 z-50 p-3 bg-red-600 text-white rounded-lg shadow-lg flex items-center space-x-3">
      <span>Você está offline.</span>
      <Button onClick={handleReload} className="bg-white text-red-600 hover:bg-gray-100">
        Recarregar
      </Button>
    </div>
  );
} 