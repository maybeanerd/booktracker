# BookTracker Frontend

Nuxt frontend and Tauri application for BookTracker.

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- Rust (latest stable) - for Tauri

### Development

```bash
# Run Tauri dev (app with Nuxt dev server)
pnpm dev

# Run Nuxt dev server only (web only, without Tauri)
pnpm nuxt:dev

# Type check
pnpm typecheck
```

### Building

```bash
# Build Nuxt for static generation
pnpm nuxt:build

# Build app for your current platform (includes Nuxt build)
pnpm build
```

Installers will be created in `src-tauri/target/release/bundle/`.

## Tech Stack

- **Framework**: Nuxt
- **UI Library**: Vue
- **Runtime**: Tauri
- **Language**: TypeScript

## Project Structure

```
frontend/
├── components/       # Vue components
├── pages/           # Nuxt pages (file-based routing)
├── public/          # Static assets
├── src-tauri/       # Tauri Rust backend
│   ├── src/        # Rust source
│   ├── icons/      # App icons
│   └── tauri.conf.json
├── app.vue         # Root component
└── nuxt.config.ts  # Nuxt configuration
```

