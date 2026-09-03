# ----------------------------------------------------
# Stage 1: Build & Dependencies dengan Bun
# ----------------------------------------------------
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy dependency lock & package.json
COPY package.json bun.lock* ./

# Install dependencies dengan Bun
RUN bun install --frozen-lockfile || bun install

# Copy seluruh source code
COPY . .

# Build SvelteKit application
RUN bun run build

# ----------------------------------------------------
# Stage 2: Production Runner dengan Bun Runtime
# ----------------------------------------------------
FROM oven/bun:1-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy hasil build dan dependencies dari builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# Expose port aplikasi
EXPOSE 3000

# Jalankan server SvelteKit langsung menggunakan Bun
CMD ["bun", "build/index.js"]
