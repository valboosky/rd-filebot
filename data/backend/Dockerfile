FROM node:20-slim AS base

# Environment variables for user and group
ARG PUID=1000
ARG PGID=1000

# Install dependencies and FileBot
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    openjdk-17-jre \
    sudo && \
    getent group ${PGID} || groupadd -g ${PGID} appgroup && \
    id -u ${PUID} >/dev/null 2>&1 || useradd -u ${PUID} -g appgroup -m appuser && \
    echo 'appuser ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
    curl -fsSL "https://raw.githubusercontent.com/filebot/plugins/master/gpg/maintainer.pub" | gpg --dearmor -o /usr/share/keyrings/filebot.gpg && \
    echo "deb [arch=all signed-by=/usr/share/keyrings/filebot.gpg] https://get.filebot.net/deb/ universal main" > /etc/apt/sources.list.d/filebot.list && \
    apt-get update && \
    apt-get install -y --install-recommends filebot && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy project files
COPY . .

# Install Node.js dependencies
RUN npm ci

# Build app
RUN npm run build

# Final stage
FROM node:20-slim

ARG PUID=1000
ARG PGID=1000

# Copy built files from base stage
COPY --from=base /usr/src/app /usr/src/app

# Set working directory
WORKDIR /usr/src/app

# Create app user
RUN getent group ${PGID} || groupadd -g ${PGID} appgroup && \
    id -u ${PUID} >/dev/null 2>&1 || useradd -u ${PUID} -g appgroup -m appuser

USER appuser

# Expose port and start the app
EXPOSE 3000
CMD ["node", "dist/server.mjs"]
