# syntax=docker/dockerfile:1.6
ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-bookworm-slim AS deps
ENV NODE_ENV=production
WORKDIR /app
# Install deps
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci

FROM node:${NODE_VERSION}-bookworm-slim AS builder
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:${NODE_VERSION}-bookworm-slim AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
RUN useradd -m -u 1001 nextjs
# Copy minimal runtime files
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./\.next
COPY --from=builder /app/next.config.* ./ 

EXPOSE 3000
ENV PORT=3000
USER nextjs
CMD ["npm","run","start"]
