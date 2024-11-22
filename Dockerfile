# Base stage for dependencies
FROM node:20.18.0-slim AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Builder stage
FROM node:20.18.0-slim AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for production build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build application
RUN npm run build

# Add debugging information
RUN ls -la .next/standalone/

# Production stage
FROM node:20.18.0-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files and set permissions
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Debug: List files to verify server.js exists
RUN ls -la

# Set user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000

# Start the application
CMD ["node", "server.js"]
