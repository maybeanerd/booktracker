# GitHub Environments

## production

Required Secrets:

**Desktop:**
- `TAURI_SIGNING_PRIVATE_KEY` - The Tauri updater private key for code signing
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` - Password to decrypt the private key

**Android:**
- `TAURI_ANDROID_KEYSTORE_BASE64` - Your Android keystore file encoded as base64 (use `base64 -i keystore.jks | tr -d '\n'`)
- `TAURI_ANDROID_KEYSTORE_PASSWORD` - Password to unlock the keystore
- `TAURI_ANDROID_KEY_ALIAS` - The alias name within the keystore
- `TAURI_ANDROID_KEY_PASSWORD` - Password for the specific key alias
