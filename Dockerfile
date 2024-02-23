# 定義建構階段 builder
FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 定義運行階段
FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]

