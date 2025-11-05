# booktracker

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
