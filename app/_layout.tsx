import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { PaperProvider, MD3LightTheme as DefaultTheme,  } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [haveFontsLoaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat.ttf'),
  });

  useEffect(() => {
    if (haveFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [haveFontsLoaded]);

  if (!haveFontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
    {/* // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    {/* // </ThemeProvider> */}
    </PaperProvider>
  );
}
