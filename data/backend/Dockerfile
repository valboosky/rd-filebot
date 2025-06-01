FROM node:20-slim

# Set build arguments
ARG PUID=1000
ARG PGID=1000
ARG TZ=America/New_York
ARG UMASK=002

ENV TZ=$TZ \
    UMASK=$UMASK

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
    curl -fsSL https://raw.githubusercontent.com/filebot/plugins/master/gpg/maintainer.gpg | gpg --dearmor -o /usr/share/keyrings/filebot-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/filebot-archive-keyring.gpg] https://apt.filebot.net stable main" > /etc/apt/sources.list.d/filebot.list && \
    apt-get update && apt-get install -y filebot && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "server.mjs"]
