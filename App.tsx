import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { I18nProvider } from './src/i18n';
import { EnemyManagerProvider } from './src/context';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/components/brand/SplashScreen';

// Prevent the native splash screen from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide native splash as soon as React renders (custom splash takes over)
    ExpoSplashScreen.hideAsync();
  }, []);

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
