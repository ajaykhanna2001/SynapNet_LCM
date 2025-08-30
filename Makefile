.PHONY: help install up down seed clean api web test lint typecheck build

help: ## Show this help message
	@echo "FleetOps Calendar - Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	pnpm install

up: ## Start all services with Docker Compose
	cd infra && docker-compose up -d
	@echo "🚀 FleetOps Calendar is starting up..."
	@echo "📋 API will be available at: http://localhost:8080/api"
	@echo "📚 API Documentation: http://localhost:8080/api/docs" 
	@echo "🌐 Frontend will be available at: http://localhost:3000"
	@echo ""
	@echo "⏳ Please wait for all services to be ready before running 'make seed'"

down: ## Stop all services
	cd infra && docker-compose down

seed: ## Seed the database with sample data
	@echo "🌱 Seeding database..."
	pnpm --filter @fleetops/api run db:push
	pnpm --filter @fleetops/api run db:seed
	@echo "✅ Database seeded successfully!"
	@echo ""
	@echo "🔑 Login credentials:"
	@echo "   Admin: admin@example.com / password"
	@echo "   Viewer: viewer@example.com / password"

clean: ## Clean build artifacts and dependencies
	pnpm --recursive run clean
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules

api: ## Start API in development mode
	pnpm --filter @fleetops/api run dev

web: ## Start frontend in development mode  
	pnpm --filter @fleetops/frontend run dev

test: ## Run all tests
	pnpm --recursive run test

lint: ## Run linters
	pnpm --recursive run lint

lint-fix: ## Fix linting issues
	pnpm --recursive run lint:fix

typecheck: ## Run TypeScript type checking
	pnpm --recursive run typecheck

build: ## Build all packages
	pnpm --recursive run build

# Development helpers
dev-api: ## Start API with database (requires PostgreSQL running)
	cd apps/api && pnpm db:push && pnpm run dev

dev-web: ## Start frontend only
	cd apps/frontend && pnpm run dev

# Docker helpers
logs: ## Show logs from all services
	cd infra && docker-compose logs -f

restart: ## Restart all services
	cd infra && docker-compose restart

status: ## Show status of all services
	cd infra && docker-compose ps

# Database helpers
db-reset: ## Reset database (WARNING: destroys all data)
	cd infra && docker-compose down -v
	cd infra && docker-compose up -d postgres
	sleep 5
	$(MAKE) seed

db-studio: ## Open Prisma Studio
	pnpm --filter @fleetops/api run db:studio