# --- Stage 1: Build the Vite Application ---
FROM node:22-alpine AS build
WORKDIR /app

# Copy dependency definitions and install packages
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Build the production assets (Vite outputs to /dist)
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Custom Nginx configuration supporting SPA client-side routing on port 3000
RUN echo 'server { \
    listen 3000; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copy Vite build artifacts from the /dist directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000 

CMD ["nginx", "-g", "daemon off;"]