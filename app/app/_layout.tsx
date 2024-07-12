import * as Sentry from '@sentry/react-native'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MD3DarkTheme, PaperProvider } from 'react-native-paper'

import { db } from '@/db/client'
import migrations from '@/db/migrations/migrations'
import Toast from '@/shared/components/Toast'
import Context from '@/shared/context'

Sentry.init({
  dsn: 'https://64ffbe37c5fcfb045fa5ac415b9e5d16@o196886.ingest.us.sentry.io/4507545983385600',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function App() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <Context>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
            <Stack.Screen name="error" options={{ headerShown: false }} />
            <Stack.Screen name="add-idea" options={{ headerShown: false }} />
            <Stack.Screen name="add-label" options={{ headerShown: false }} />
            <Stack.Screen name="edit-idea" options={{ headerShown: false }} />
            <Stack.Screen name="edit-label" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
        <Toast />
      </Context>
    </PaperProvider>
  )
}

const AppWrapper = () => {
  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  })
  const { success } = useMigrations(db, migrations)

  useEffect(() => {
    if (loaded && success) {
      // I have no idea why but if SplashScreen.hideAsync isn't at the top default export it doesn't work?
      SplashScreen.hideAsync()
    }
  }, [loaded, success])

  if (!loaded && !success) {
    return null
  }

  return <App />
}

export default AppWrapper
