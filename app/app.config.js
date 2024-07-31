import 'dotenv/config'

const config = () => ({
  expo: {
    runtimeVersion: {
      policy: 'appVersion',
    },
    name: process.env.APP_NAME || 'Ideas Down',
    slug: 'ideas-down-quickly',
    version: '1.1.10',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
    },
    ios: {
      bundleIdentifier:
        process.env.EXPO_BUNDLE_IDENTIFIER ||
        'com.sillysideprojects.ideas.prod',
      supportsTablet: true,
      entitlements: {},
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router', 'expo-font'],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '9e15961d-db12-438f-b60a-0e9fdaaa279d',
      },
    },
  },
})

export default config()
