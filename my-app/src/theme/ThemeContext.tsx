import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme, Theme as NavigationTheme } from '@react-navigation/native';

type SupportedTheme = 'light' | 'dark';

type ThemeContextValue = {
  currentTheme: SupportedTheme;
  navigationTheme: NavigationTheme;
  toggleTheme: () => void;
};

const STORAGE_KEY = 'app.theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function resolveInitialTheme(systemScheme: ColorSchemeName): SupportedTheme {
  if (systemScheme === 'dark') return 'dark';
  return 'light';
}

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const systemScheme = Appearance.getColorScheme();
  const [currentTheme, setCurrentTheme] = useState<SupportedTheme>(() => resolveInitialTheme(systemScheme));

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          if (isMounted) setCurrentTheme(stored);
        }
      } catch {
        // Ignore persistence read errors
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  const navigationTheme: NavigationTheme = useMemo(() => {
    return currentTheme === 'dark' ? NavigationDarkTheme : NavigationLightTheme;
  }, [currentTheme]);

  const value = useMemo<ThemeContextValue>(() => ({ currentTheme, navigationTheme, toggleTheme }), [currentTheme, navigationTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
}

