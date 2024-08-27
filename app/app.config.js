import 'dotenv/config'

const config = () => ({
  expo: {
    runtimeVersion: {
      policy: 'appVersion',
    },
    icon: './assets/images/icon.png',
    name: process.env.EXPO_APP_NAME || 'Ideas Down',
    slug: 'ideas-down-quickly',
    version: '1.3.0',
    orientation: 'portrait',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#3A4D53',
    },
    ios: {
      bundleIdentifier:
        process.env.EXPO_BUNDLE_IDENTIFIER ||
        'com.sillysideprojects.ideas.prod',
      supportsTablet: true,
      entitlements: {},
    },
    android: {
      package:
        process.env.EXPO_BUNDLE_IDENTIFIER ||
        'com.sillysideprojects.ideas.prod',
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
