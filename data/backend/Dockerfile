# Stage 1: Builder layer with caching
FROM node:20-slim AS builder

WORKDIR /usr/src/app

# Install system dependencies needed during build
RUN apt-get update && apt-get install -y \
  curl \
  gnupg \
  ca-certificates \
  openjdk-17-jre \
  sudo \
  && rm -rf /var/lib/apt/lists/*

# Add non-root user (reused in final image)
RUN getent group 1000 || groupadd -g 1000 appgroup && \
    id -u 1000 >/dev/null 2>&1 || useradd -u 1000 -g appgroup -m appuser

# Copy and install only package.json + lock file (to cache layer)
COPY package*.json ./
RUN npm install

# Copy source code last (doesn’t bust cache unless source changed)
COPY . .

# Stage 2: Minimal runtime layer
FROM node:20-slim

WORKDIR /usr/src/app

# Install only what's needed to run
RUN apt-get update && apt-get install -y \
  openjdk-17-jre \
  sudo \
  && rm -rf /var/lib/apt/lists/*

# Create appuser (again here since this is a separate stage)
RUN getent group 1000 || groupadd -g 1000 appgroup && \
    id -u 1000 >/dev/null 2>&1 || useradd -u 1000 -g appgroup -m appuser

# Copy built app and node_modules from builder
COPY --from=builder /usr/src/app /usr/src/app

# Use non-root user
USER appuser

# Expose backend port
EXPOSE 3001

# Start the backend
CMD ["npm", "start"]