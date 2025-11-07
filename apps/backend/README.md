# BookTracker Backend

NestJS backend API for BookTracker, using Drizzle ORM with PostgreSQL.

## Getting Started

### Prerequisites

- Node.js 24.11.0
- PostgreSQL 16+

### Setup

1. Install dependencies (from root):
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. Run migrations:
   ```bash
   pnpm db:migrate
   ```

### Development

```bash
# Run dev server
pnpm start:dev

# Run tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Lint
pnpm lint

# Format
pnpm format
```

### Database

```bash
# Generate migrations from schema changes
pnpm db:generate

# Run migrations
pnpm db:migrate

# Open Drizzle Studio (database GUI)
pnpm db:studio
```

### Docker

```bash
# Build image
docker build -t booktracker-backend .

# Run container
docker run -p 3001:3001 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/booktracker \
  booktracker-backend
```

Or use docker-compose from the root:
```bash
docker-compose up backend
```

## API Endpoints

- `GET /` - Health check
- More endpoints to be documented...

## Tech Stack

- **Framework**: NestJS 11
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Language**: TypeScript
