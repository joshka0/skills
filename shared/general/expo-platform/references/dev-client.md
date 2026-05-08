# Development Client

Build and distribute Expo development clients for testing native code changes on
physical devices. **Only create development clients when your app requires custom
native code.** Most apps work fine in Expo Go.

You need a dev client ONLY when using:

- Local Expo modules (custom native code)
- Apple targets (widgets, app clips, extensions)
- Third-party native modules not in Expo Go

**Try Expo Go first** with `npx expo start`. If everything works, you don't need
a dev client.

## EAS Configuration

Ensure `eas.json` has a development profile:

```json
{
  "cli": {
    "version": ">= 16.0.1",
    "appVersionSource": "remote"
  },
  "build": {
    "production": {
      "autoIncrement": true
    },
    "development": {
      "autoIncrement": true,
      "developmentClient": true
    }
  },
  "submit": {
    "production": {},
    "development": {}
  }
}
```

Key settings:

- `developmentClient: true` — Bundles expo-dev-client for development builds
- `autoIncrement: true` — Automatically increments build numbers
- `appVersionSource: "remote"` — Uses EAS as source of truth for version numbers

## Building for TestFlight

Build iOS dev client and submit to TestFlight in one command:

```bash
eas build -p ios --profile development --submit
```

This will:

1. Build the development client in the cloud
2. Automatically submit to App Store Connect
3. Send you an email when the build is ready in TestFlight

After receiving the TestFlight email:

1. Download the build from TestFlight on your device
2. Launch the app to see the expo-dev-client UI
3. Connect to your local Metro bundler or scan a QR code

## Building Locally

```bash
# iOS (requires Xcode)
eas build -p ios --profile development --local

# Android
eas build -p android --profile development --local
```

Local builds output:

- iOS: `.ipa` file
- Android: `.apk` or `.aab` file

## Installing Local Builds

Install iOS build on simulator:

```bash
tar -xzf build-*.tar.gz
xcrun simctl install booted ./path/to/App.app
```

Install iOS build on device (requires signing):

```bash
ideviceinstaller -i build.ipa
```

Install Android build:

```bash
adb install build.apk
```

## Building for Specific Platform

```bash
# iOS only
eas build -p ios --profile development

# Android only
eas build -p android --profile development

# Both platforms
eas build --profile development
```

## Checking Build Status

```bash
eas build:list
eas build:view
```

## Using the Dev Client

Once installed, the dev client provides:

- **Development server connection** — Enter Metro bundler URL or scan QR
- **Build information** — View native build details
- **Launcher UI** — Switch between development servers

Connect to local development:

```bash
npx expo start --dev-client
# Scan QR code with dev client or enter URL manually
```

## Troubleshooting

**Build fails with signing errors:**

```bash
eas credentials
```

**Clear build cache:**

```bash
eas build -p ios --profile development --clear-cache
```

**Check EAS CLI version:**

```bash
eas --version
eas update
```
