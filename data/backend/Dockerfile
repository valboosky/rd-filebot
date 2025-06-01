FROM node:20-bullseye

# Environment variables passed from docker-compose
ARG PUID
ARG PGID
ARG TZ
ARG UMASK

# Install required packages including OpenJDK (for FileBot)
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    openjdk-17-jre \
    sudo && \
    # Only add group/user if they don't already exist
    getent group ${PGID} || groupadd -g ${PGID} appgroup && \
    id -u ${PUID} >/dev/null 2>&1 || useradd -u ${PUID} -g appgroup -m appuser && \
    echo 'appuser ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
    # Install FileBot
    curl -fsSL https://get.filebot.net/filebot/KEYS.asc | gpg --dearmor -o /usr/share/keyrings/filebot-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/filebot-archive-keyring.gpg] https://get.filebot.net/deb universal main" > /etc/apt/sources.list.d/filebot.list && \
    apt-get update && apt-get install -y filebot && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN npm install

# Set permissions
RUN chown -R ${PUID}:${PGID} /app

# Switch to the app user
USER appuser

# Start server
CMD ["node", "server.mjs"]
