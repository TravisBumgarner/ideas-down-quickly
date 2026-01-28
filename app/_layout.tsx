import * as Sentry from '@sentry/react-native'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MD3DarkTheme, PaperProvider } from 'react-native-paper'
// import { useFonts } from 'expo-font'
import { db } from '@/db/client'
import migrations from '@/db/migrations/migrations'
import {
  CURRENT_VERSION,
  LAST_SEEN_CHANGELOG_VERSION_KEY,
  shouldShowChangelog,
} from '@/shared/changelog'
import ChangelogModal from '@/shared/components/ChangelogModal'
import Toast from '@/shared/components/Toast'
import Context from '@/shared/context'
import { performWeeklyBackupIfNeeded } from '@/shared/icloud'
import { getValueFromKeyStore, saveValueToKeyStore } from '@/shared/utilities'

Sentry.init({
  dsn: 'https://64ffbe37c5fcfb045fa5ac415b9e5d16@o196886.ingest.us.sentry.io/4507545983385600',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  // profilesSampleRate is relative to tracesSampleRate.
  // Here, we'll capture profiles for 100% of transactions.
  profilesSampleRate: 1.0,
})

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

type AppProps = {
  showChangelogModal: boolean
  onDismissChangelog: () => void
}

function App({ showChangelogModal, onDismissChangelog }: AppProps) {
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
            <Stack.Screen
              name="delete-database"
              options={{ headerShown: false }}
            />
          </Stack>
        </GestureHandlerRootView>
        <Toast />
        <ChangelogModal
          visible={showChangelogModal}
          onDismiss={onDismissChangelog}
          showFullChangelog={false}
        />
      </Context>
    </PaperProvider>
  )
}

const AppWrapper = () => {
  // const [loaded] = useFonts({
  //   Montserrat: require('../assets/fonts/Montserrat.ttf'),
  // })
  const { success } = useMigrations(db, migrations)
  const [showChangelogModal, setShowChangelogModal] = useState(false)
  const [changelogChecked, setChangelogChecked] = useState(false)

  useEffect(() => {
    if (
      // loaded &&
      success
    ) {
      // I have no idea why but if SplashScreen.hideAsync isn't at the top default export it doesn't work?
      SplashScreen.hideAsync()
    }
  }, [
    // loaded,
    success,
  ])

  useEffect(() => {
    if (success && !changelogChecked) {
      const checkChangelog = async () => {
        // Perform weekly iCloud backup if enabled
        performWeeklyBackupIfNeeded()

        const lastSeenVersion = await getValueFromKeyStore(
          LAST_SEEN_CHANGELOG_VERSION_KEY
        )
        if (shouldShowChangelog(lastSeenVersion ?? null)) {
          setShowChangelogModal(true)
        }
        setChangelogChecked(true)
      }
      checkChangelog()
    }
  }, [success, changelogChecked])

  const handleDismissChangelog = async () => {
    await saveValueToKeyStore(LAST_SEEN_CHANGELOG_VERSION_KEY, CURRENT_VERSION)
    setShowChangelogModal(false)
  }

  if (
    // !loaded &&
    !success
  ) {
    return null
  }

  return (
    <App
      showChangelogModal={showChangelogModal}
      onDismissChangelog={handleDismissChangelog}
    />
  )
}

export default AppWrapper
