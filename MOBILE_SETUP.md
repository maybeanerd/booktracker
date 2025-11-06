# Mobile Build Setup Guide

This guide covers building BookTracker for Android and iOS platforms.

## Quick Start - Local Development

The fastest way to develop and test on mobile is using Tauri's development mode:

### Android Development

```bash
cd apps/frontend

# First time only: Initialize the Android project
pnpm tauri android init

# Connect your Android device via USB or start an emulator
# To list available emulators: emulator -list-avds
# To start an emulator: emulator -avd Pixel_5_API_33

# Run the app on your device/emulator
pnpm tauri android dev
```

### iOS Development (macOS only)

```bash
cd apps/frontend

# First time only: Initialize the iOS project
pnpm tauri ios init

# Run the app (automatically opens iOS Simulator)
pnpm tauri ios dev
```

## Prerequisites

### For Android Development

1. **Java Development Kit 17**
   - Download from [Adoptium](https://adoptium.net/)
   - Verify: `java -version`

2. **Android Studio**
   - Download from [developer.android.com](https://developer.android.com/studio)
   - Install Android SDK and NDK through Android Studio
   - Set environment variables:
     ```bash
     export ANDROID_HOME=$HOME/Library/Android/sdk      # macOS
     export ANDROID_HOME=$HOME/Android/Sdk              # Linux
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```

3. **Rust targets**
   ```bash
   rustup target add aarch64-linux-android
   rustup target add armv7-linux-androideabi
   rustup target add x86_64-linux-android
   ```

### For iOS Development

1. **macOS required** - iOS development only works on macOS

2. **Xcode**
   - Install from Mac App Store
   - Open Xcode once to accept license agreements
   - Verify: `xcodebuild -version`

3. **Rust target**
   ```bash
   rustup target add aarch64-apple-ios
   ```

## Testing on Physical Devices

### Android Physical Device

1. **Enable Developer Mode on your device:**
   - Go to Settings → About phone
   - Tap "Build number" 7 times
   - Go back to Settings → System → Developer options
   - Enable "USB debugging"

2. **Connect device via USB**

3. **Verify connection:**
   ```bash
   adb devices
   # Should show your device
   ```

4. **Run the app:**
   ```bash
   cd apps/frontend
   pnpm tauri android dev
   ```

### iOS Physical Device

1. **Apple Developer Account required** (free or paid)

2. **In Xcode:**
   - Open `apps/frontend/src-tauri/gen/apple/booktracker.xcodeproj`
   - Select your development team
   - Connect your iPhone/iPad via USB
   - Select your device as the run destination

3. **Run from terminal:**
   ```bash
   cd apps/frontend
   pnpm tauri ios dev
   ```

4. **On your device:**
   - Go to Settings → General → VPN & Device Management
   - Trust your developer certificate

## Building Release Versions

### Local Debug Builds (unsigned)

```bash
cd apps/frontend

# Android debug build
pnpm tauri android build --debug

# iOS debug build
pnpm tauri ios build --debug
```

### Production Builds (requires signing)

Production builds happen automatically via GitHub Actions when you publish a release. See "Release Configuration" below.

## Release Configuration

### Android Signing Setup

1. **Generate a keystore:**
   ```bash
   keytool -genkey -v -keystore booktracker-release.keystore \
     -alias booktracker -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Store the keystore securely** (never commit to repository)

3. **Add GitHub secrets:**
   - `TAURI_ANDROID_KEYSTORE_PATH`: Path to your keystore
   - `TAURI_ANDROID_KEYSTORE_PASSWORD`: Keystore password
   - `TAURI_ANDROID_KEY_ALIAS`: Key alias (e.g., "booktracker")
   - `TAURI_ANDROID_KEY_PASSWORD`: Key password

### iOS Signing Setup

1. **Apple Developer Account** ($99/year) required for distribution

2. **Create certificates and provisioning profiles:**
   - Go to [developer.apple.com](https://developer.apple.com/)
   - Create a Distribution Certificate
   - Create a Provisioning Profile for your app

3. **Export certificate as .p12:**
   - Open Keychain Access
   - Find your distribution certificate
   - Export as .p12 file with password

4. **Add GitHub secrets:**
   - `APPLE_CERTIFICATE`: Base64-encoded .p12 certificate
     ```bash
     base64 -i certificate.p12 | pbcopy
     ```
   - `APPLE_CERTIFICATE_PASSWORD`: Certificate password
   - `APPLE_SIGNING_IDENTITY`: Your signing identity (e.g., "Apple Distribution: Your Name")
   - `APPLE_PROVISIONING_PROFILE`: Base64-encoded provisioning profile
   - `APPLE_TEAM_ID`: Your Apple Team ID

## Build Pipelines

### Development Builds (build.yml)

Runs on every PR and push to main:
- Tests Android ARM64 build
- Tests iOS build
- Verifies environment setup and compilation
- Does not require signing

### Production Releases (release.yml)

Runs when you publish a GitHub release:

**Android targets:**
- ARM64 (`aarch64-linux-android`) - Modern 64-bit devices
- ARMv7 (`armv7-linux-androideabi`) - Older 32-bit devices
- x86_64 (`x86_64-linux-android`) - Emulators

**iOS target:**
- ARM64 (`aarch64-apple-ios`) - All modern iOS devices

**Desktop targets:**
- Linux (x86_64)
- macOS (x86_64, ARM64, Universal)
- Windows (x86_64)

## Project Configuration

Mobile configuration is in `apps/frontend/src-tauri/tauri.conf.json`:

```json
{
  "bundle": {
    "iOS": {
      "minimumSystemVersion": "13.0"
    },
    "android": {
      "minSdkVersion": 24
    }
  }
}
```

### Permissions

Add platform-specific permissions as needed:

- **Android:** Edit `apps/frontend/src-tauri/gen/android/app/src/main/AndroidManifest.xml`
- **iOS:** Edit `apps/frontend/src-tauri/gen/apple/booktracker_iOS/Info.plist`

### App Icons

Icons are automatically generated for mobile platforms from your base icons in `apps/frontend/src-tauri/icons/`.

## Troubleshooting

### Android: "SDK not found"
```bash
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
export ANDROID_HOME=$HOME/Android/Sdk          # Linux
```

### Android: "NDK not found"
Install NDK through Android Studio:
- Tools → SDK Manager → SDK Tools → NDK (Side by side)

### iOS: "No such module 'Tauri'"
```bash
cd apps/frontend
rm -rf src-tauri/gen/apple
pnpm tauri ios init
```

### iOS: "Signing for requires a development team"
Open the Xcode project and select your development team in the signing settings.

### "Rust target not installed"
```bash
# Install all mobile targets
rustup target add aarch64-linux-android
rustup target add armv7-linux-androideabi
rustup target add x86_64-linux-android
rustup target add aarch64-apple-ios
```

## Development Tips

### Hot Reload
Both Android and iOS dev modes support hot reload. Changes to your frontend code will automatically refresh the app.

### Debugging

**Android:**
```bash
# View logs
adb logcat | grep -i tauri
```

**iOS:**
- Open Console.app on macOS
- Filter by your device name
- Look for "booktracker" logs

### Building for Different Architectures

```bash
# Android - specific architecture
pnpm tauri android build --target aarch64-linux-android

# iOS simulator (x86_64 for Intel Macs, aarch64 for Apple Silicon)
pnpm tauri ios build --target x86_64-apple-ios-sim
```

## Resources

- [Tauri Mobile Docs](https://v2.tauri.app/develop/mobile/)
- [Android Developer Docs](https://developer.android.com/)
- [iOS Developer Docs](https://developer.apple.com/documentation/)
- [React Native (similar mobile concepts)](https://reactnative.dev/)
