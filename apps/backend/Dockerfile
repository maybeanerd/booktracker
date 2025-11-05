FROM node:22.17.1
WORKDIR /app

COPY ["package.json", "./"]
# Install pnpm
RUN corepack enable pnpm

# Install dependencies
RUN pnpm i --frozen-lockfile

# Build
COPY . .
RUN pnpm build

# Expose port
EXPOSE 3001

# Start service
CMD ["pnpm", "start:prod"]

