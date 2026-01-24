# Ideas Down

## Setup

1. Install dependencies: `yarn`
2. Copy `.env.example` to `.env`
3. Install Fastlane (for iOS builds): `brew install fastlane`
4. Install ADB (for Android device installs): `brew install android-platform-tools`

## Development

```bash
yarn start          # Start Expo dev server
yarn ios            # Run on iOS simulator
yarn android        # Run on Android emulator
```

## Building

All builds run locally via EAS. Build artifacts output to the project root (`.ipa`, `.apk`, `.aab`).

| Profile | Purpose | iOS | Android |
|---------|---------|-----|---------|
| dev | Development build with dev client | `yarn build:ios:dev` | `yarn build:android:dev` |
| internal | Ad-hoc install to registered devices | `yarn build:ios:internal` | `yarn build:android:internal` |
| testflight | TestFlight beta distribution | `yarn build:ios:testflight` | - |
| production | App store release | `yarn build:ios:production` | `yarn build:android:production` |

### iOS Device Registration

Before building for a physical iOS device:

```bash
yarn device:register
```

Scan the QR code, then go to Settings > General > VPN & Device Management to complete registration.

### Installing Builds

**iOS:** Open Xcode > Window > Devices and Simulators > Drag `.ipa` onto device

**Android:** `adb install path/to/file.apk` (use `adb devices` to verify connection)

## Releasing

### Version Bump

Update version in both files:
- `package.json`
- `app.config.js`

### TestFlight (iOS Beta)

```bash
yarn build:ios:testflight
yarn submit:ios
```

Then distribute to testers in App Store Connect > TestFlight.

### App Store Submission

```bash
# iOS
yarn build:ios:production
yarn submit:ios

# Android
yarn build:android:production
yarn submit:android
```

## Database

Generate migrations after schema changes:

```bash
yarn db:generate
```

### Inspecting SQLite (iOS Simulator)

```bash
cd ~/Library/Developer/CoreSimulator/Devices
find . -name database.db
# Open the found path in a SQLite browser
```

### Data Backup/Restore

**iOS Simulator:**
1. Find device in Xcode > Window > Devices and Simulators
2. Navigate to `~/Library/Developer/CoreSimulator/Devices/DEVICE_ID/data/Containers/Shared/AppGroup/`
3. Export/import JSON files from this location

**Android Emulator:** Drag files onto emulator screen to save to Downloads.
