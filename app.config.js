import 'dotenv'

const config = () => ({
  expo: {
    name: 'Brainstorm',
    slug: 'brainstorm-app',
    version: '1.0.0',
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
      bundleIdentifier: process.env.BUNDLE_IDENTIFIER,
      supportsTablet: true,
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
        projectId: '9cda37b6-928c-4684-aecc-636ea8f8a69f',
      },
    },
  },
})

console.log(config())

export default config()
