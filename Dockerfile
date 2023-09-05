FROM node:alpine AS builder
WORKDIR /app
COPY /*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["node", "run","start:prod"]