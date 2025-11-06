# GitHub Environments Setup

This repository uses GitHub Environments to protect sensitive secrets and control deployments.

## Environment: `production`

The `production` environment is used for release builds and deployments.

### Protection Rules

Configure these protection rules in GitHub:

1. **Go to:** Repository Settings → Environments → New environment → `production`

2. **Required reviewers:** (Optional but recommended)
   - Add team members who should approve production deployments
   - Requires manual approval before release workflows run

3. **Deployment branches:**
   - Select "Selected branches"
   - Add rule: `main` (only allow deployments from main branch)
   - This prevents forks and PRs from accessing production secrets

### Secrets Required

Add these secrets to the `production` environment:

#### Desktop Signing
- `TAURI_SIGNING_PRIVATE_KEY` - Tauri updater private key
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` - Password for the private key

#### Android Signing
- `TAURI_ANDROID_KEYSTORE_PATH` - Path to Android keystore file
- `TAURI_ANDROID_KEYSTORE_PASSWORD` - Keystore password
- `TAURI_ANDROID_KEY_ALIAS` - Key alias in the keystore
- `TAURI_ANDROID_KEY_PASSWORD` - Key password

