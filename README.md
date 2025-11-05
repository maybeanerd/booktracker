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

## Getting Started

### Prerequisites

- **Node.js**: 24.11.0 (install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **Rust**: Latest stable (install from [rustup.rs](https://rustup.rs/))

### Setup

1. **Enable Corepack** (one-time setup):
   ```bash
   corepack enable
   ```
   
   This ensures you use the correct pnpm version (`10.11.0`) specified in `package.json`.

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the app**:
   ```bash
   # Full app (Tauri + Nuxt)
   pnpm tauri:dev
   
   # Frontend only (for UI development)
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

- **CI (`ci.yml`)**: Runs on PRs to main
  - Tests on Linux, macOS, and Windows
  - Checks Rust formatting
  - Builds Nuxt frontend
  - Runs Rust tests
  - **Optimized**: pnpm caching + concurrency control

- **Lint (`lint.yml`)**: Runs on PRs to main
  - Rust: formatting & Clippy
  - Frontend: TypeScript type checking
  - **Optimized**: pnpm caching

- **Release (`release.yml`)**: Triggered when a release is published
  - Builds platform-specific installers
  - Creates GitHub releases with artifacts
  - Supports: Linux (x64), macOS (Intel, ARM, Universal), Windows (x64)
  - **Optimized**: Concurrency control + pnpm caching

- **Updater (`updater.yml`)**: Generates auto-update manifests
  - Creates `latest.json` for Tauri updater
  - Publishes with each release

### Workflow Optimizations

- ✅ **pnpm Store Caching**: Faster dependency installs (~60% time savings)
- ✅ **pnpm Version Management**: Version locked in `package.json` (`packageManager` field)
- ✅ **Rust Caching**: Reuses compiled dependencies
- ✅ **Concurrency Control**: Cancels redundant runs
- ✅ **Parallel Jobs**: Lint and CI run independently

## Additional Scripts

```bash
# Type checking
pnpm typecheck

# Rust formatting
pnpm format:rust

# Rust linting
pnpm lint:rust

# Rust tests
pnpm test:rust
```
