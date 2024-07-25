FROM node:20.15.1-alpine3.20 AS development
WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:20.15.1-alpine3.20 AS dependencies
WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

FROM node:20.15.1-alpine3.20 AS builder
ENV NODE_ENV=production
WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build


FROM node:20.15.1-alpine3.20 AS production

# Does not know what this does
ENV NODE_ENV=production
WORKDIR /app

# Expose the port Next.js is running on
EXPOSE 3000

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=dependencies /app/node_modules ./node_modules
CMD ["npm", "start"]

