# Backend

NestJS API with Drizzle ORM and PostgreSQL.

## Setup

```bash
# From root: pnpm install
cp .env.example .env  # Edit with database credentials
pnpm db:migrate
```

## Development

```bash
pnpm dev         # Run dev server
pnpm test        # Unit tests
pnpm test:e2e    # E2E tests
pnpm lint        # Lint code
```

## Database

```bash
pnpm db:generate  # Generate migration
pnpm db:migrate   # Run migrations
pnpm db:studio    # Open database GUI
```

Schema: `src/db/schema.ts`

## Docker

```bash
docker build -t booktracker-backend .
docker run -p 3001:3001 -e DATABASE_URL="..." booktracker-backend

# Or from root:
docker compose up backend
```

For more information, check the [root readme](../../README.md).
