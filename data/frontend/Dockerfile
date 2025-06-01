# Stage 1: Build the frontend using Node.js
FROM node:20 AS builder

WORKDIR /app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source code and build it
COPY . ./
RUN npm run build

# Stage 2: Serve the built app using NGINX
FROM nginx:stable-alpine

# Copy the build output to the default NGINX public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 3000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
