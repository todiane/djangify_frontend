FROM node:20.18.0-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20.18.0-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for production build
ENV NEXT_TELEMETRY_DISABLED=1 \
  NODE_ENV=production \
  PORT=8080 \
  HOST=0.0.0.0

# Update next.config.js to ensure proper port binding
RUN echo "module.exports = {experimental: {outputStandalone: true}}" > next.config.js

# Build application
RUN npm run build

FROM node:20.18.0-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=8080 \
  HOST=0.0.0.0

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Copy necessary files and set permissions
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set user
USER nextjs

# Expose port 8080
EXPOSE 8080

# Update the start command to explicitly use PORT and HOST
CMD ["sh", "-c", "node server.js -p ${PORT:-8080} -H ${HOST:-0.0.0.0}"]
