# booktracker
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

A multi platform application and server to track your book reading journey, built with Tauri, Nuxt, and NestJS.

## Project Structure

This is a pnpm monorepo containing:

- **`apps/frontend`** - Tauri + Nuxt application
- **`apps/backend`** - NestJS API with Drizzle ORM and PostgreSQL

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (see `.nvmrc`)
- [Rust](https://www.rust-lang.org/)
- [Docker](https://docs.docker.com/engine/install/)

### Installation

```bash
# Install dependencies
pnpm install

# Set up database
docker compose up -d postgres 

# Configure backend
cp apps/backend/env.example apps/backend/.env
# Edit apps/backend/.env with your database credentials

# Run migrations
pnpm db:migrate
```

### Development

```bash
# Run everything
pnpm dev

# Or individually
pnpm dev:frontend  # Tauri app
pnpm dev:backend   # NestJS API
pnpm db:studio     # Database GUI
```

### Mobile Setup

Building booktracker for Android.

#### Prerequesites

```bash
cd apps/frontend

# First time: initialize Android project
pnpm tauri android init
```


#### Physical Device Testing

1. **Enable Developer Mode:** Settings → About phone → Tap "Build number" 7 times
2. **Enable USB debugging:** Settings → System → Developer options → USB debugging
3. **Connect via USB** and verify: `adb devices`
4. **Run:** `cd apps/frontend && pnpm tauri android dev`

## Building

```bash
# Local debug build (unsigned)
cd apps/frontend
pnpm tauri android build --debug
```


### Nix Flake

This project includes a Nix flake for a reproducible development environment.

To enter the Nix shell:
```bash
nix develop
```

This will drop you in a Bash shell with Node, Pnpm, Rust & Tauri.

You can also use direnv to automatically enter the Nix shell when you `cd` into the project. (More info: https://direnv.net/)


## Building

```bash
# Frontend (Tauri app for current platform)
pnpm build:frontend

# Backend
pnpm build:backend

# Backend Docker image
docker build -t booktracker-backend ./apps/backend
```

## Testing

```bash
pnpm test:rust           # Frontend Rust tests
pnpm test:backend        # Backend unit tests
pnpm test:backend:e2e    # Backend e2e tests
```

## Database

Uses Drizzle ORM with PostgreSQL. Schema: `apps/backend/src/db/schema.ts`

```bash
pnpm db:generate  # Generate migration
pnpm db:migrate   # Run migrations
pnpm db:studio    # Open database GUI
```

## Docker

```bash
# Local development
docker compose up -d
docker compose logs -f
docker compose down

# Build backend image (from repo root)
docker build -f apps/backend/Dockerfile -t booktracker-backend .

# Run backend container
docker run -p 3001:3001 -e DATABASE_URL="postgresql://..." booktracker-backend
```

## License

[AGPL-3.0](LICENSE)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://diluz.io"><img src="https://avatars.githubusercontent.com/u/18548570?v=4?s=100" width="100px;" alt="Sebastian Di Luzio"/><br /><sub><b>Sebastian Di Luzio</b></sub></a><br /><a href="https://github.com/maybeanerd/booktracker/commits?author=maybeanerd" title="Code">💻</a> <a href="https://github.com/maybeanerd/booktracker/commits?author=maybeanerd" title="Documentation">📖</a> <a href="#tool-maybeanerd" title="Tools">🔧</a> <a href="#maintenance-maybeanerd" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tiborpilz"><img src="https://avatars.githubusercontent.com/u/915045?v=4?s=100" width="100px;" alt="Tibor Pilz"/><br /><sub><b>Tibor Pilz</b></sub></a><br /><a href="https://github.com/maybeanerd/booktracker/commits?author=tiborpilz" title="Code">💻</a> <a href="https://github.com/maybeanerd/booktracker/commits?author=tiborpilz" title="Documentation">📖</a> <a href="#tool-tiborpilz" title="Tools">🔧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!