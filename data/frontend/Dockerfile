# Stage 1: Build the frontend using Node.js
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build
COPY . ./
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:stable-alpine

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Add a custom nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose default HTTP port
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
