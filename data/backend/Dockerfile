FROM node:20-slim

ARG PUID=1000
ARG PGID=1000

RUN apt-get update && apt-get install -y \
    curl gnupg ca-certificates openjdk-17-jre sudo && \
    groupadd -g ${PGID} appgroup && \
    useradd -u ${PUID} -g appgroup -m appuser && \
    echo 'appuser ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
    curl -fsSL https://get.filebot.net/filebot/KEYS.asc | gpg --dearmor -o /usr/share/keyrings/filebot-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/filebot-archive-keyring.gpg] https://get.filebot.net/deb universal main" > /etc/apt/sources.list.d/filebot.list && \
    apt-get update && apt-get install -y filebot && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

USER appuser
ENV PORT=3001
EXPOSE 3001

CMD ["node", "server.mjs"]