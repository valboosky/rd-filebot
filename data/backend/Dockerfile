# Stage 1: Base
FROM node:20-slim AS base

WORKDIR /usr/src/app

# Install base dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    openjdk-17-jre \
    sudo && \
    getent group 1000 || groupadd -g 1000 appgroup && \
    id -u 1000 >/dev/null 2>&1 || useradd -u 1000 -g appgroup -m appuser

# Copy package files & install
COPY package*.json ./
RUN npm install

# Copy full source code
COPY . .

# Stage 2: Runtime
FROM node:20-slim

WORKDIR /usr/src/app
COPY --from=base /usr/src/app /usr/src/app

# Create non-root user
RUN getent group 1000 || groupadd -g 1000 appgroup && \
    id -u 1000 >/dev/null 2>&1 || useradd -u 1000 -g appgroup -m appuser

USER appuser

EXPOSE 3001
CMD ["npm", "start"]
