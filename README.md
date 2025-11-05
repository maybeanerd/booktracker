# BookTracker

A modern book tracking application built with Tauri, Nuxt 3, and NestJS.

## 📁 Project Structure

This is a pnpm monorepo containing:

- **`apps/frontend`** - Tauri desktop application with Nuxt 3
- **`apps/backend`** - NestJS REST API with Drizzle ORM

```
booktracker/
├── apps/
│   ├── frontend/           # Tauri + Nuxt 3 desktop app
│   │   ├── src-tauri/      # Rust backend for Tauri
│   │   ├── pages/          # Nuxt pages
│   │   ├── components/     # Vue components
│   │   └── nuxt.config.ts  # Nuxt configuration
│   └── backend/            # NestJS API
│       ├── src/            # Source code
│       ├── drizzle/        # Database migrations
│       └── Dockerfile      # Container definition
├── .github/workflows/      # CI/CD pipelines
├── docker-compose.yml      # Local development setup
├── pnpm-workspace.yaml     # Monorepo configuration
└── package.json            # Root scripts
```

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) >= 24.11.0 (see `.nvmrc`)
- [pnpm](https://pnpm.io/) >= 10.11.0
- [Rust](https://www.rust-lang.org/) (for Tauri)
- [PostgreSQL](https://www.postgresql.org/) (or use Docker Compose)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/booktracker.git
   cd booktracker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up the database**
   
   Using Docker:
   ```bash
   docker-compose up -d postgres
   ```
   
   Or install PostgreSQL locally and create a database named `booktracker`.

4. **Configure backend environment**
   
   Copy the example environment file:
   ```bash
   cp apps/backend/env.example apps/backend/.env
   ```
   
   Edit `apps/backend/.env` with your database credentials.

5. **Run database migrations**
   ```bash
   pnpm db:migrate
   ```

### Development

**Run everything in parallel:**
```bash
pnpm dev
```

**Or run individually:**

- **Frontend (Tauri):**
  ```bash
  pnpm dev:frontend
  # or
  pnpm tauri:dev
  ```

- **Backend (NestJS):**
  ```bash
  pnpm dev:backend
  ```

- **Database Studio:**
  ```bash
  pnpm db:studio
  ```

## 🏗️ Building

### Frontend (Desktop App)

```bash
# Build for your current platform
pnpm tauri:build

# Or build just the Nuxt frontend
pnpm build:frontend
```

### Backend (API)

```bash
# Build the NestJS app
pnpm build:backend

# Build Docker image
docker build -t booktracker-backend ./apps/backend
```

## 🧪 Testing

### Frontend
```bash
# Run Rust tests
pnpm test:rust
```

### Backend
```bash
# Run unit tests
pnpm test:backend

# Run e2e tests
pnpm test:backend:e2e
```

## 🗄️ Database

This project uses [Drizzle ORM](https://orm.drizzle.team/) for database management.

### Common Commands

```bash
# Generate new migration
pnpm db:generate

# Run migrations
pnpm db:migrate

# Open Drizzle Studio
pnpm db:studio
```

### Schema

The database schema is defined in `apps/backend/src/db/schema.ts`.

## 🐳 Docker

### Local Development with Docker Compose

```bash
# Start PostgreSQL + Backend
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Backend Docker Image

The backend Dockerfile uses `node:22.17.1-slim` and pnpm monorepo support for efficient builds.

```bash
# Build (context is repo root, not apps/backend)
docker build -f apps/backend/Dockerfile -t booktracker-backend .

# Run
docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  booktracker-backend
```

## 📝 Scripts Reference

### Root-level commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run frontend and backend in parallel |
| `pnpm build` | Build all apps |
| `pnpm typecheck` | Type check all packages |

### Frontend commands

| Command | Description |
|---------|-------------|
| `pnpm dev:frontend` | Run Nuxt dev server |
| `pnpm build:frontend` | Build Nuxt for production |
| `pnpm tauri:dev` | Run Tauri in dev mode |
| `pnpm tauri:build` | Build Tauri desktop app |
| `pnpm format:rust` | Format Rust code |
| `pnpm lint:rust` | Lint Rust code |
| `pnpm test:rust` | Run Rust tests |

### Backend commands

| Command | Description |
|---------|-------------|
| `pnpm dev:backend` | Run NestJS in watch mode |
| `pnpm build:backend` | Build NestJS for production |
| `pnpm lint:backend` | Lint backend code |
| `pnpm test:backend` | Run backend tests |
| `pnpm test:backend:e2e` | Run backend e2e tests |
| `pnpm db:generate` | Generate DB migration |
| `pnpm db:migrate` | Run DB migrations |
| `pnpm db:studio` | Open Drizzle Studio |

## 🔧 CI/CD

The project includes several GitHub Actions workflows:

- **`build.yml`** - Builds frontend and backend on PR/push
- **`lint.yml`** - Runs linting and type checking
- **`release.yml`** - Creates Tauri releases for all platforms
- **`docker-backend.yml`** - Builds and pushes backend Docker image
- **`updater.yml`** - Generates Tauri updater JSON

## 🛠️ Tech Stack

### Frontend
- **[Tauri](https://tauri.app/)** - Desktop app framework
- **[Nuxt 3](https://nuxt.com/)** - Vue.js framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Backend
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Tools
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Docker](https://www.docker.com/)** - Containerization
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD

## 📄 License

[MIT](LICENSE)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ✨ by [maybeanerd](https://github.com/maybeanerd)
