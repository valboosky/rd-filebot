# Stage 1: Build the frontend
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY data/frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY data/frontend/ ./

# Build the app
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Copy built frontend assets
COPY --from=builder /app/dist /usr/share/nginx/html

# (Optional) Copy custom nginx config if needed
# COPY data/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
