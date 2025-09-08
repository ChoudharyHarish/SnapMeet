# Base stage
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development stage
FROM base AS dev
COPY . .
CMD ["npm", "start"]

# Production stage
FROM node:18-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["node", "app.js"]
