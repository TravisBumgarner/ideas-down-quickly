# New Releases

1. Make code changes and merge into master.
1. Update ChangeLog.tsx and merge into master.
1. Deploy Website.
1. Increment version number
    1. Update package.json with new version number
    1. Update app.config.js with new version number
1. Perform local testing for Android and iOS
    - iOS
        - `yarn run build:ios:local:internal`
        - Load ipa onto device via XCode
    - Android
        - `yarn run build:android:local:internal`
        - Load apk onto device via `yarn run move-apk-to-device`
1. (Optional) Generate new screenshots
    1. Play Store
    1. App Store
1. Build for production.
    - iOS
        - `yarn run build:ios:local:production`
