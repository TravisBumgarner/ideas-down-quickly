import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider, MD3LightTheme as DefaultTheme,  } from 'react-native-paper';
import { db } from '@/db/client';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/db/migrations/migrations';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  console.log(error)

  const [haveFontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  });

  console.log(error, success)

  const hasLoaded = [
    haveFontsLoaded,
    success
  ].every(i => i)

  // const hasErrored = [
  //   error
  // ].some(i => i)

  // useEffect(() => {
    
  //   if(hasErrored) {
  //     const timeout = setTimeout(() => {
  //      router.replace('error')
  //     }, 5000);
  
  //     return () => clearTimeout(timeout);
  //   } 
  // }, [hasErrored])

  useEffect(() => {
    if (hasLoaded) {
      SplashScreen.hideAsync();
    }
  }, [hasLoaded]);

  if (!hasLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="error" />
      </Stack>
    </PaperProvider>
  );
}
