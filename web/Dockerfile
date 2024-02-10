FROM node:21-alpine as build

RUN npm install -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 8080

CMD ["pnpx", "serve", "-s", "dist", "-l", "8080"]