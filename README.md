# booktracker

[![CI](https://github.com/maybeanerd/booktracker/workflows/CI/badge.svg)](https://github.com/maybeanerd/booktracker/actions/workflows/ci.yml)
[![Lint](https://github.com/maybeanerd/booktracker/workflows/Lint/badge.svg)](https://github.com/maybeanerd/booktracker/actions/workflows/lint.yml)
[![Release](https://github.com/maybeanerd/booktracker/workflows/Release/badge.svg)](https://github.com/maybeanerd/booktracker/actions/workflows/release.yml)

A multi-platform app to track your book reading journey, built with Nuxt 4 and Tauri 2.

## Tech Stack

- **Frontend**: Nuxt
- **Client Backend**: Tauri
- **Backend** Nest.js (TODO)

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