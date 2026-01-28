import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

import { DARK_THEME, LIGHT_THEME, type SemanticColors } from './theme'

export type ThemeMode = 'system' | 'light' | 'dark'

const THEME_MODE_KEY = 'theme_mode'

type ThemeContextValue = {
  colors: SemanticColors
  mode: ThemeMode
  isDark: boolean
  setMode: (mode: ThemeMode) => void
  paperTheme: typeof MD3DarkTheme
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: DARK_THEME,
  mode: 'dark',
  isDark: true,
  setMode: () => {},
  paperTheme: MD3DarkTheme,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark')
  const systemScheme = useColorScheme()

  useEffect(() => {
    AsyncStorage.getItem(THEME_MODE_KEY).then(stored => {
      if (stored === 'system' || stored === 'light' || stored === 'dark') {
        setModeState(stored)
      }
    })
  }, [])

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode)
    AsyncStorage.setItem(THEME_MODE_KEY, newMode)
  }

  const isDark =
    mode === 'dark' || (mode === 'system' && systemScheme !== 'light')

  const colors = isDark ? DARK_THEME : LIGHT_THEME
  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme

  return (
    <ThemeContext.Provider value={{ colors, mode, isDark, setMode, paperTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
