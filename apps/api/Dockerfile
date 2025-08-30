FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm@8.6.0

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm db:generate

# Build the application
RUN pnpm build

EXPOSE 8080

CMD ["pnpm", "start:prod"]