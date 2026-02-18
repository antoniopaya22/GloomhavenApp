import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import type { Enemy, EnemyType, StatusEffect, AppSettings } from '../types';
import { DEFAULT_SETTINGS } from '../types';
import { useTranslations } from '../i18n';

const SETTINGS_KEY = 'gh-settings';
const ENEMIES_KEY = 'gh-enemies';

interface EnemyManagerContextType {
  enemies: Enemy[];
  settings: AppSettings;
  // Enemy actions
  addEnemy: (name: string, maxHp: number, type: EnemyType, quantity: number) => void;
  removeEnemy: (id: string) => void;
  clearAllEnemies: () => void;
  duplicateEnemy: (id: string) => void;
  updateEnemyHp: (id: string, amount: number) => void;
  updateEnemyMaxHp: (id: string, maxHp: number) => void;
  updateEnemyName: (id: string, name: string) => void;
  updateEnemyNumber: (id: string, number: number) => void;
  toggleStatus: (id: string, status: StatusEffect) => void;
  toggleCollapse: (id: string) => void;
  collapseAll: () => void;
  // Settings actions
  updateSettings: (key: keyof AppSettings, value: boolean) => void;
  // Stats
  totalEnemies: number;
  totalHp: number;
}

const EnemyManagerContext = createContext<EnemyManagerContextType | null>(null);

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function getNextNumber(enemies: Enemy[], name: string): number {
  const sameNameNumbers = enemies
    .filter((e) => e.name === name)
    .map((e) => e.number)
    .sort((a, b) => a - b);

  // Find first available gap
  for (let i = 1; i <= sameNameNumbers.length + 1; i++) {
    if (!sameNameNumbers.includes(i)) return i;
  }
  return 1;
}

export function EnemyManagerProvider({ children }: { children: React.ReactNode }) {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const t = useTranslations();

  // Load persisted data
  useEffect(() => {
    (async () => {
      try {
        const [savedSettings, savedEnemies] = await Promise.all([
          AsyncStorage.getItem(SETTINGS_KEY),
          AsyncStorage.getItem(ENEMIES_KEY),
        ]);
        if (savedSettings) setSettings(JSON.parse(savedSettings));
        if (savedEnemies) setEnemies(JSON.parse(savedEnemies));
      } catch {}
    })();
  }, []);

  // Persist enemies
  useEffect(() => {
    AsyncStorage.setItem(ENEMIES_KEY, JSON.stringify(enemies)).catch(() => {});
  }, [enemies]);

  // Persist settings
  useEffect(() => {
    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)).catch(() => {});
  }, [settings]);

  const addEnemy = useCallback(
    (name: string, maxHp: number, type: EnemyType, quantity: number) => {
      setEnemies((prev) => {
        const newEnemies: Enemy[] = [];
        let current = [...prev];
        for (let i = 0; i < quantity; i++) {
          const number = getNextNumber([...current, ...newEnemies], name);
          const enemy: Enemy = {
            id: generateId(),
            name,
            number,
            type,
            maxHp,
            currentHp: maxHp,
            statuses: [],
            isCollapsed: settings.compactCards,
          };
          newEnemies.push(enemy);
        }
        return [...current, ...newEnemies];
      });
    },
    [settings.compactCards]
  );

  const removeEnemy = useCallback((id: string) => {
    setEnemies((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearAllEnemies = useCallback(() => {
    if (settings.confirmClear) {
      Alert.alert(
        t['em.clear'],
        t['js.confirmClear'],
        [
          { text: t['em.modal.cancel'], style: 'cancel' },
          {
            text: t['em.clear'],
            style: 'destructive',
            onPress: () => setEnemies([]),
          },
        ]
      );
    } else {
      setEnemies([]);
    }
  }, [settings.confirmClear, t]);

  const duplicateEnemy = useCallback((id: string) => {
    setEnemies((prev) => {
      const source = prev.find((e) => e.id === id);
      if (!source) return prev;
      const number = getNextNumber(prev, source.name);
      const clone: Enemy = {
        ...source,
        id: generateId(),
        number,
        currentHp: source.maxHp,
        statuses: [],
        isCollapsed: false,
      };
      return [...prev, clone];
    });
  }, []);

  const updateEnemyHp = useCallback(
    (id: string, amount: number) => {
      setEnemies((prev) =>
        prev.reduce<Enemy[]>((acc, e) => {
          if (e.id !== id) {
            acc.push(e);
            return acc;
          }
          const newHp = Math.max(0, Math.min(e.maxHp, e.currentHp + amount));
          if (newHp <= 0 && settings.autoRemoveDead) {
            // Don't include this enemy - auto-removed
            return acc;
          }
          acc.push({ ...e, currentHp: newHp });
          return acc;
        }, [])
      );
    },
    [settings.autoRemoveDead]
  );

  const updateEnemyMaxHp = useCallback((id: string, maxHp: number) => {
    setEnemies((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, maxHp, currentHp: Math.min(e.currentHp, maxHp) }
          : e
      )
    );
  }, []);

  const updateEnemyName = useCallback((id: string, name: string) => {
    setEnemies((prev) => prev.map((e) => (e.id === id ? { ...e, name } : e)));
  }, []);

  const updateEnemyNumber = useCallback((id: string, number: number) => {
    setEnemies((prev) =>
      prev.map((e) => (e.id === id ? { ...e, number } : e))
    );
  }, []);

  const toggleStatus = useCallback((id: string, status: StatusEffect) => {
    setEnemies((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const has = e.statuses.includes(status);
        return {
          ...e,
          statuses: has
            ? e.statuses.filter((s) => s !== status)
            : [...e.statuses, status],
        };
      })
    );
  }, []);

  const toggleCollapse = useCallback((id: string) => {
    setEnemies((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, isCollapsed: !e.isCollapsed } : e
      )
    );
  }, []);

  const collapseAll = useCallback(() => {
    setEnemies((prev) => {
      const allCollapsed = prev.every((e) => e.isCollapsed);
      return prev.map((e) => ({ ...e, isCollapsed: !allCollapsed }));
    });
  }, []);

  const updateSettings = useCallback(
    (key: keyof AppSettings, value: boolean) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const totalEnemies = enemies.length;
  const totalHp = enemies.reduce((sum, e) => sum + e.currentHp, 0);

  return (
    <EnemyManagerContext.Provider
      value={{
        enemies,
        settings,
        addEnemy,
        removeEnemy,
        clearAllEnemies,
        duplicateEnemy,
        updateEnemyHp,
        updateEnemyMaxHp,
        updateEnemyName,
        updateEnemyNumber,
        toggleStatus,
        toggleCollapse,
        collapseAll,
        updateSettings,
        totalEnemies,
        totalHp,
      }}
    >
      {children}
    </EnemyManagerContext.Provider>
  );
}

export function useEnemyManager() {
  const context = useContext(EnemyManagerContext);
  if (!context) {
    throw new Error('useEnemyManager must be used within an EnemyManagerProvider');
  }
  return context;
}
