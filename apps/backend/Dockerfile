FROM node:24.11.1-slim
WORKDIR /app

# Copy workspace configuration
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

# Copy backend package.json
COPY apps/backend/package.json ./apps/backend/

# Install pnpm
RUN corepack enable pnpm

# Install dependencies
RUN pnpm install --filter backend --frozen-lockfile

# Copy backend source
COPY apps/backend ./apps/backend

# Build
WORKDIR /app/apps/backend
RUN pnpm build

# Expose port
EXPOSE 3001

# Start service (run migrations first, then start)
CMD ["sh", "-c", "pnpm db:migrate && pnpm start:prod"]

