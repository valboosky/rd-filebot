# Use slim Node.js base for smaller image
FROM node:20-slim

# Set working directory
WORKDIR /usr/src/app

# Install dependencies (Java required for FileBot)
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    openjdk-17-jre \
    sudo \
 && rm -rf /var/lib/apt/lists/*

# Create non-root user to match host UID/GID
#RUN groupadd -g 1000 appgroup && useradd -u 1000 -g appgroup -m appuser

# Copy package files and install node modules
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Use non-root user
#USER appuser

# Expose backend port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]