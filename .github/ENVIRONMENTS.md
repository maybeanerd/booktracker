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

### Setting Up Android Keystore

To encode your keystore file for the `TAURI_ANDROID_KEYSTORE_BASE64` secret:

```bash
base64 -i /path/to/your/keystore.jks | tr -d '\n'
```

Copy the output and store it as the `TAURI_ANDROID_KEYSTORE_BASE64` secret in GitHub.
The workflow will automatically decode it and place it at `/tmp/keystore.jks` during the build.

