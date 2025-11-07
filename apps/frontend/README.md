# BookTracker Frontend

Nuxt 4 frontend and Tauri 2 desktop application for BookTracker.

## Getting Started

### Prerequisites

- Node.js 24.11.0
- Rust (latest stable) - for desktop app only

### Development

```bash
# Run Nuxt dev server (web only)
pnpm dev

# Run Tauri dev (desktop app)
pnpm tauri:dev

# Type check
pnpm typecheck
```

### Building

```bash
# Build for web
pnpm build

# Build desktop app
pnpm tauri:build
```

Desktop installers will be created in `src-tauri/target/release/bundle/`.

## Tech Stack

- **Framework**: Nuxt 4
- **UI Library**: Vue 3
- **Desktop Runtime**: Tauri 2
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

