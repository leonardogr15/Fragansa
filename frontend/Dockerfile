# frontend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# servir build estático con 'serve'
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
