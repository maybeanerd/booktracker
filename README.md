# booktracker

[![Build](https://github.com/maybeanerd/booktracker/workflows/Build/badge.svg)](https://github.com/maybeanerd/booktracker/actions/workflows/build.yml)
[![Lint](https://github.com/maybeanerd/booktracker/workflows/Lint/badge.svg)](https://github.com/maybeanerd/booktracker/actions/workflows/lint.yml)
[![Release](https://github.com/maybeanerd/booktracker/workflows/Release/badge.svg)](https://github.com/maybeanerd/booktracker/actions/workflows/release.yml)

A multi-platform app to track your book reading journey, built with Nuxt 4, Tauri 2, and NestJS.

## Tech Stack

- **Frontend**: Nuxt 4 (Vue 3)
- **Desktop Client**: Tauri 2
- **Backend API**: NestJS with Drizzle ORM
- **Database**: PostgreSQL

## Project Structure

This is a pnpm monorepo with the following structure:

```
booktracker/
├── apps/
│   ├── frontend/          # Nuxt 4 frontend + Tauri desktop client
│   │   ├── components/
│   │   ├── pages/
│   │   ├── public/
│   │   ├── src-tauri/     # Tauri Rust backend
│   │   └── nuxt.config.ts
│   └── backend/           # NestJS API server
│       ├── src/
│       │   ├── db/        # Drizzle ORM setup
│       │   └── main.ts
│       ├── drizzle.config.ts
│       └── Dockerfile
└── package.json           # Root workspace configuration
```

## Getting Started

### Prerequisites

- **Node.js**: 24.11.0 (install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **Rust**: Latest stable (install from [rustup.rs](https://rustup.rs/)) - only needed for desktop app
- **PostgreSQL**: Latest stable - only needed for backend API

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

3. **Set up the backend** (optional - only if you want to run the API):
   ```bash
   # Create a PostgreSQL database
   createdb booktracker
   
   # Copy the example env file
   cp apps/backend/.env.example apps/backend/.env
   
   # Update DATABASE_URL in apps/backend/.env with your database connection string
   
   # Run database migrations
   pnpm --filter backend db:migrate
   ```

4. **Run the app**:
   ```bash
   # Full desktop app (Tauri + Nuxt)
   pnpm tauri:dev
   
   # Frontend only (for UI development)
   pnpm dev:frontend
   
   # Backend API only
   pnpm dev:backend
   
   # Both frontend and backend (parallel)
   pnpm dev
   ```

## Development

### Frontend Development

```bash
# Run frontend dev server
pnpm dev:frontend

# Run desktop app
pnpm tauri:dev

# Type check
pnpm --filter frontend typecheck
```

### Backend Development

```bash
# Run backend dev server
pnpm dev:backend

# Run tests
pnpm test:backend

# Lint
pnpm --filter backend lint

# Database operations
pnpm --filter backend db:generate  # Generate migrations
pnpm --filter backend db:migrate   # Run migrations
pnpm --filter backend db:studio    # Open Drizzle Studio
```

## Building

### Desktop App

```bash
# Build for production
pnpm tauri:build
```

This will create platform-specific installers in `apps/frontend/src-tauri/target/release/bundle/`.

### Backend API

```bash
# Build backend
pnpm build:backend

# Run production build
pnpm --filter backend start:prod
```

Or using Docker Compose (includes PostgreSQL):

```bash
# Start both backend and database
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

Or build backend Docker image manually:

```bash
cd apps/backend
docker build -t booktracker-backend .
docker run -p 3001:3001 -e DATABASE_URL=postgresql://... booktracker-backend
```

## Architecture

- **Frontend (Nuxt)**: Runs as a SPA within Tauri for the desktop app
- **Backend (NestJS)**: Optional REST API server for data sync/multi-device support
- **Database (PostgreSQL)**: Backend data storage with Drizzle ORM for type-safe queries