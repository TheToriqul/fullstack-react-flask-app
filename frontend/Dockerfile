# Build stage
FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install framer-motion @babel/plugin-proposal-private-property-in-object

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]