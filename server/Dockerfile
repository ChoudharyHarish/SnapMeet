FROM node:18-alpine

WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

EXPOSE 3001

CMD ["node", "app.js"]
