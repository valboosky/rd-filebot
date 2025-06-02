# Stage 1: Build dependencies and source
FROM node:20-slim AS base

WORKDIR /usr/src/app

# Install dependencies needed at build time
RUN apt-get update && apt-get install -y \
  curl \
  gnupg \
  ca-certificates \
  openjdk-17-jre

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Stage 2: Runtime image
FROM node:20-slim

WORKDIR /usr/src/app

# Copy app from build stage
COPY --from=base /usr/src/app /usr/src/app

# Do NOT use appuser for now — run as root (default)
EXPOSE 3001
CMD ["npm", "start"]
