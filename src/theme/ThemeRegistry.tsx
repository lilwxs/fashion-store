'use client';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { ThemeToggleContext } from '@/context/ThemeToggleContext';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('shop-theme')) {
        window.localStorage.setItem('shop-theme', 'light');
      } else {
        setMode(localStorage.getItem('shop-theme') as 'light' | 'dark');
      }
      setMounted(true);
    }
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        window.localStorage.setItem('shop-theme', mode === 'light' ? 'dark' : 'light');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = React.useMemo(() => {
    //@ts-ignore
    return mode === 'light' ? createTheme(lightTheme) : createTheme(darkTheme);
  }, [mode]);

  return (
    <>
      {mounted ? (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
          <ThemeToggleContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {children}
            </ThemeProvider>
          </ThemeToggleContext.Provider>
        </NextAppDirEmotionCacheProvider>
      ) : null}
    </>
  );
}
