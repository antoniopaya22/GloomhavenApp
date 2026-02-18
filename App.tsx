import React, { useState, useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nProvider } from './src/i18n';
import { EnemyManagerProvider } from './src/context';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/components/brand/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <SafeAreaProvider>
      <I18nProvider>
        <EnemyManagerProvider>
          <HomeScreen />
          {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
        </EnemyManagerProvider>
      </I18nProvider>
    </SafeAreaProvider>
  );
}
