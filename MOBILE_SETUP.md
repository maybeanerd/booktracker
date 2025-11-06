# Mobile Build Setup Guide

This guide covers building BookTracker for Android.

## Quick Start - Local Development

The fastest way to develop and test on mobile is using Tauri's development mode:

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

## Testing on Physical Devices

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

## Building Release Versions

### Local Debug Builds (unsigned)

```bash
cd apps/frontend

# Android debug build
pnpm tauri android build --debug
```

### Production Builds (requires signing)

Production builds happen automatically via GitHub Actions when you publish a release. See "Release Configuration" below.

## Release Configuration

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

## Build Pipelines

### Development Builds (build.yml)

Runs on every PR and push to main:
- Tests desktop builds (Linux, macOS, Windows)
- Tests Android ARM64 build
- Verifies environment setup and compilation
- Does not require signing

### Production Releases (release.yml)

Runs when you publish a GitHub release:

**Android targets:**
- ARM64 (`aarch64-linux-android`) - Modern 64-bit devices
- ARMv7 (`armv7-linux-androideabi`) - Older 32-bit devices
- x86_64 (`x86_64-linux-android`) - Emulators and x86 devices

**Desktop targets:**
- Linux (x86_64)
- macOS (x86_64, ARM64, Universal)
- Windows (x86_64)

## Project Configuration

Android configuration is in `apps/frontend/src-tauri/tauri.conf.json`:

```json
{
  "bundle": {
    "android": {
      "minSdkVersion": 24
    }
  }
}
```

### Permissions

Add Android-specific permissions in:
`apps/frontend/src-tauri/gen/android/app/src/main/AndroidManifest.xml`

### App Icons

Icons are automatically generated for Android from your base icons in `apps/frontend/src-tauri/icons/`.

## Troubleshooting

### "Android SDK not found"
```bash
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
export ANDROID_HOME=$HOME/Android/Sdk          # Linux
```

### "NDK not found"
Install NDK through Android Studio:
- Tools → SDK Manager → SDK Tools → NDK (Side by side)

### "Rust target not installed"
```bash
# Install all Android targets
rustup target add aarch64-linux-android
rustup target add armv7-linux-androideabi
rustup target add x86_64-linux-android
```

## Development Tips

### Hot Reload
Android dev mode supports hot reload. Changes to your frontend code will automatically refresh the app.

### Debugging

View Android logs:
```bash
adb logcat | grep -i tauri
```

### Building for Different Architectures

```bash
# Build for specific Android architecture
pnpm tauri android build --target aarch64-linux-android
pnpm tauri android build --target armv7-linux-androideabi
pnpm tauri android build --target x86_64-linux-android
```

## Resources

- [Tauri Mobile Docs](https://v2.tauri.app/develop/mobile/)
- [Android Developer Docs](https://developer.android.com/)
- [Tauri Android Guide](https://v2.tauri.app/develop/mobile/android/)
