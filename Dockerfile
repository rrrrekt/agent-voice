# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Install runtime dependencies
# ffmpeg is required for PCM to MP3 conversion
RUN apk add --no-cache ffmpeg

# Install production node modules
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Environment variables (defaults)
ENV PORT=3400
ENV NODE_ENV=production

EXPOSE 3400

CMD ["node", "dist/index.js"]
