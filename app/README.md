# Deploys  

### Android Build

1. Local setup: https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical&mode=development-build&buildEnv=local
2. Install abd `brew install android-platform-tools`
3. `abd devices` to list phone.
4. Phone needs to be in developer mode with USB debugging enabled and stay awake.
5. `yarn run build:android:local:development`
6. Install on device
  - Emulator:  `npx expo run:android`
  - Device: `adb -s deviceid install path/to/the/file.apk` (`adb devices` to get IDs)


### Android Deploy to store

- https://github.com/expo/fyi/blob/main/creating-google-service-account.md

1. `yarn run build:android:local:production`
2. `yarn run submit:android`

## iOS

Notes
- `production` is the branch to be used for deploying to the app store.

### Development Build for iOS

[Tutorial](https://docs.expo.dev/develop/development-builds/create-a-build/)

This still requires a connection to the macbook and local dev running in VS COde

1. `yarn run register:ios
  1. Select Website
  2. Scan QR Code on phone and goto Settings -> General ->VPN & Device Management -> Register for Development
  3. Install
2. `yarn run build:ios:local:development`

### Distribution for Internal Use

[Tutorial](https://docs.expo.dev/build/internal-distribution/)

- TestFlight share app with up to 100 internal testers
- Internal distribution - EAS feature that allows developers to share a URL to install app

Add new devices
1. `yarn run register:ios`
  1. Select Website
  2. Scan QR Code on phone and goto Settings -> General ->VPN & Device Management -> Register for Development
  3. Install

Build on Server
1. `yarn run build:ios:cloud:internal`

Build Locally
1. `yarn run build:ios:local:internal`
2. Open XCode -> Window -> Devices & Simulators -> Select phone -> Drag IPA onto phone. 

### Deploy to iOS Store

https://docs.expo.dev/submit/ios/

1. `yarn build:ios:cloud:production`
2. 

# Local Development

# iOS

- `brew install fastlane`

## SQLite

cd /Users/travisbumgarner/Library/Developer/CoreSimulator/Devices
find . -name database.db
open [pathname]
Should open in SQLite Browser

## iOS Backups & Restores of Data

1. Get the device name from XCode -> Windows -> Devices & Simulators (Match Name from Simulator to list)
2. cd `/Users/travisbumgarner/Library/Developer/CoreSimulator/Devices/DEVICE_NAME_HERE/data/Containers/Shared/AppGroup/`
3. Create a backup such as `Foo.json`
4. `find . -name Foo.json` (If the name isn't exact it won't match. Make sure not to save as `Foo.json.json` on accident)
5. Drag restore file into this folder, open on iOS device.