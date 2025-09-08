# Base stage
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development stage
FROM base AS dev
COPY . .
CMD ["npm", "start"]

# Build stage
FROM base AS builder
COPY . .
RUN npm run build

# Production stage with nginx
FROM nginx:alpine AS prod
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
