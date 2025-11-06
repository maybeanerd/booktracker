# Mobile Build Setup Guide

This document describes the setup required to build BookTracker for Android and iOS platforms.

## Prerequisites

### For Android Builds

1. **Initialize Android Project**
   ```bash
   cd apps/frontend
   pnpm tauri android init
   ```

2. **Android Keystore for Signing**
   - Generate a keystore:
     ```bash
     keytool -genkey -v -keystore booktracker-release.keystore \
       -alias booktracker -keyalg RSA -keysize 2048 -validity 10000
     ```
   - Add the keystore to your repository secrets (or store securely)
   - Set the following GitHub secrets:
     - `TAURI_ANDROID_KEYSTORE_PATH`: Path to your keystore file
     - `TAURI_ANDROID_KEYSTORE_PASSWORD`: Keystore password
     - `TAURI_ANDROID_KEY_ALIAS`: Key alias (e.g., "booktracker")
     - `TAURI_ANDROID_KEY_PASSWORD`: Key password

3. **Update Android Configuration**
   - Edit `apps/frontend/src-tauri/gen/android/app/build.gradle.kts` if needed
   - Ensure permissions are set in AndroidManifest.xml

### For iOS Builds

1. **Initialize iOS Project**
   ```bash
   cd apps/frontend
   pnpm tauri ios init
   ```

2. **Apple Developer Account Requirements**
   - An active Apple Developer account ($99/year)
   - Provisioning profiles for distribution
   - Distribution certificate

3. **Code Signing**
   - Export your distribution certificate as a .p12 file
   - Set the following GitHub secrets:
     - `APPLE_CERTIFICATE`: Base64-encoded .p12 certificate
     - `APPLE_CERTIFICATE_PASSWORD`: Certificate password
     - `APPLE_SIGNING_IDENTITY`: Your signing identity (e.g., "Apple Distribution: Your Name")
     - `APPLE_PROVISIONING_PROFILE`: Base64-encoded provisioning profile
     - `APPLE_TEAM_ID`: Your Apple Team ID

4. **Update iOS Configuration**
   - Edit `apps/frontend/src-tauri/gen/apple/booktracker.xcodeproj` in Xcode
   - Configure bundle identifier to match provisioning profile
   - Set deployment target (minimum iOS 13.0)

## Testing Builds Locally

### Android
```bash
cd apps/frontend
pnpm tauri android dev
pnpm tauri android build
```

### iOS
```bash
cd apps/frontend
pnpm tauri ios dev
pnpm tauri ios build
```

## Build Targets

### Android
The workflow builds for three Android architectures:
- **aarch64** (ARM64): Modern 64-bit ARM devices
- **armv7** (ARMv7): Older 32-bit ARM devices
- **x86_64**: For emulators and x86 Android devices

### iOS
- **aarch64**: All modern iOS devices (iPhone 5s and later, all iPad Air, all iPad mini 2+)

## Additional Configuration

### Permissions

Add required permissions to platform-specific manifests:
- **Android**: `apps/frontend/src-tauri/gen/android/app/src/main/AndroidManifest.xml`
- **iOS**: `apps/frontend/src-tauri/gen/apple/booktracker_iOS/Info.plist`

### App Icons

Ensure icons are properly sized for mobile:
- **Android**: Icons will be generated from your base icon
- **iOS**: Icons will be generated from your base icon

The build process will automatically generate platform-specific icon sets.

## Troubleshooting

### Android Build Fails
- Ensure NDK version matches (currently 26.1.10909125)
- Check Java version is 17
- Verify Android SDK is properly installed

### iOS Build Fails
- Ensure Xcode is up to date
- Verify code signing certificates are valid
- Check provisioning profile matches bundle identifier
- Ensure you're on macOS (iOS builds require macOS)

### Universal Errors
- Check `tauri.conf.json` is properly configured
- Ensure all dependencies are installed (`pnpm install`)
- Verify Rust targets are installed:
  ```bash
  rustup target add aarch64-linux-android armv7-linux-androideabi x86_64-linux-android aarch64-apple-ios
  ```

## Release Process

1. Create a new release on GitHub
2. The workflow will automatically:
   - Build for all desktop platforms (Linux, macOS, Windows)
   - Build for all Android architectures
   - Build for iOS
   - Upload artifacts to the release

## Notes

- Android builds run on Ubuntu runners
- iOS builds run on macOS runners
- All signing keys and certificates should be stored as GitHub secrets, never committed to the repository
- The workflow creates draft releases by default - review before publishing

