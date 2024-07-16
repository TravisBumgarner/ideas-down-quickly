# Local Development Notes

## Prettier / eslint

I am writing this as a note to myself when Prettier / eslint eventually stop working. 
All settings should be in `settings.json`. 
The installed VS Code extensions are 
- Enabled
  - Related - `ESLint`
  - Unrelated - `Black Formatter`, `Flake 8`
- Disabled
  - Related - `Prettier - Code formatter`, `Prettier ESLint` (It appears I don't need either of these plugins to lint with the NPM packages I've installed. )

# Development Build for iOS

[Tutorial](https://docs.expo.dev/develop/development-builds/create-a-build/)

This still requires a connection to the macbook and local dev running in VS COde

1. `yarn run register:ios
  1. Select Website
  2. Scan QR Code on phone and goto Settings -> General ->VPN & Device Management -> Register for Development
  3. Install
2. `yarn run build:ios:local:development`

# Distribution for Internal Use

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

# Deploy to iOS Store

https://docs.expo.dev/submit/ios/

1. `yarn build:ios:cloud:production`
2. 

# SQLite

cd /Users/travisbumgarner/Library/Developer/CoreSimulator/Devices
find . -name database.db
open [pathname]
Should open in SQLite Browser

# iOS Backups & Restores of Data

1. Get the device name from XCode -> Windows -> Devices & Simulators (Match Name from Simulator to list)
2. cd `/Users/travisbumgarner/Library/Developer/CoreSimulator/Devices/DEVICE_NAME_HERE/data/Containers/Shared/AppGroup/`
3. Create a backup such as `Foo.json`
4. `find . -name Foo.json` (If the name isn't exact it won't match. Make sure not to save as `Foo.json.json` on accident)
5. Drag restore file into this folder, open on iOS device.