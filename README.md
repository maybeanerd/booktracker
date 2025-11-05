# booktracker

[![CI](https://github.com/maybeanerd/booktracker/workflows/CI/badge.svg)](https://github.com/maybeanerd/booktracker/actions/workflows/ci.yml)
[![Lint](https://github.com/maybeanerd/booktracker/workflows/Lint/badge.svg)](https://github.com/maybeanerd/booktracker/actions/workflows/lint.yml)
[![Release](https://github.com/maybeanerd/booktracker/workflows/Release/badge.svg)](https://github.com/maybeanerd/booktracker/actions/workflows/release.yml)

A multi-platform app to track your book reading journey, built with Nuxt 4 and Tauri 2.

## Tech Stack

- **Frontend**: Nuxt 4 (Vue 3)
- **Backend**: Tauri 2 (Rust)
- **Package Manager**: pnpm
- **Node Version**: 24.11.0

## Project Structure

```
booktracker/
├── app.vue              # Nuxt root layout
├── pages/               # Nuxt pages (auto-routed)
├── components/          # Vue components
├── public/              # Static assets
├── nuxt.config.ts       # Nuxt configuration
├── package.json         # Frontend dependencies
├── src-tauri/           # Tauri Rust backend
│   ├── Cargo.toml       # Rust dependencies
│   ├── tauri.conf.json  # Tauri configuration
│   └── src/             # Rust source code
└── .output/             # Build output (gitignored)
```

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode (Tauri + Nuxt)
pnpm tauri:dev

# Or run Nuxt only (for frontend development)
pnpm dev
```

## Building

```bash
# Build for production
pnpm tauri:build
```

This will create platform-specific installers in `src-tauri/target/release/bundle/`.

## Key Configuration

- **Nuxt** runs on port 3000 in development
- **Nuxt** builds to `.output/public/` for production
- **SSR is disabled** (required for Tauri)
- **Tauri** watches `src-tauri/` directory separately

## CI/CD Pipelines

This project includes GitHub Actions workflows for automated building and testing:

### Workflows

- **CI (`ci.yml`)**: Runs on every PR
  - Tests on Linux, macOS, and Windows
  - Checks Rust formatting
  - Builds Nuxt frontend
  - Runs Rust tests

- **Release (`release.yml`)**: Triggered by tags (e.g., `v0.2.0`)
  - Builds platform-specific installers
  - Creates GitHub releases with artifacts
  - Supports: Linux (x64), macOS (Intel, ARM, Universal), Windows (x64)

- **Updater (`updater.yml`)**: Generates auto-update manifests
  - Creates `latest.json` for Tauri updater
  - Publishes with each release

