import { db } from '@/db/client'
import migrations from '@/db/migrations/migrations'
import Toast from '@/shared/components/Toast'
import Context, { context } from '@/shared/context'
import * as Sentry from '@sentry/react-native'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { useFonts } from 'expo-font'
import { Stack, router } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useContext, useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper'
import 'react-native-reanimated'

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
  const { success: haveMigrationsRun, error: haveMigrationsErrored } =
    useMigrations(db, migrations)
  const {
    state: {
      settings: { colorTheme },
    },
  } = useContext(context)
  const [hasTimeoutExecuted, setHasTimeoutExecuted] = useState(false)

  const [haveFontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  })

  const hasLoaded = [
    haveFontsLoaded,
    haveMigrationsRun,
    hasTimeoutExecuted,
  ].every(i => i)

  console.log('haveMigrationsErrored', haveMigrationsErrored)
  console.log('haveMigrationsRun', haveMigrationsRun)
  console.log('haveFontsLoaded', haveFontsLoaded)
  console.log('hasTimeoutExecuted', hasTimeoutExecuted)
  console.log('hasLoaded', hasLoaded)

  const hasErrored = [haveMigrationsErrored].some(i => i)
  const paperTheme = colorTheme === 'dark' ? MD3DarkTheme : MD3LightTheme

  useEffect(() => {
    setTimeout(() => setHasTimeoutExecuted(true), 500)
  }, [])

  useEffect(() => {
    if (hasErrored) {
      router.replace('error')
    }
  }, [hasErrored])

  useEffect(() => {
    if (hasLoaded || hasErrored) {
      console.log("I'm hiding the splash screen")
      SplashScreen.hideAsync()
    }
  }, [hasLoaded, hasErrored])

  if (!hasLoaded && !hasErrored) {
    return null
  }

  return (
    <PaperProvider theme={paperTheme}>
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
    </PaperProvider>
  )
}

const AppWrapper = () => {
  return (
    <Context>
      <StatusBar style="auto" />
      <App />
      <Toast />
    </Context>
  )
}

export default Sentry.wrap(AppWrapper)
