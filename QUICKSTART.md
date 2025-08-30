# FleetOps Calendar - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- pnpm 8+ (will be installed automatically)

### Setup (5 minutes)

1. **Install dependencies:**
   ```bash
   make install
   ```

2. **Start the application:**
   ```bash
   make up
   ```
   
3. **Seed the database:**
   ```bash
   make seed
   ```

### Access the Application

- **🌐 Frontend:** http://localhost:3000
- **📋 API:** http://localhost:8080/api  
- **📚 API Docs:** http://localhost:8080/api/docs

### Demo Credentials

- **Admin:** admin@example.com / password
- **Viewer:** viewer@example.com / password

## 🎯 What You Can Do

### Dashboard
- View KPIs (events, contracts, assets, alerts)
- See AI insights preview
- Quick action buttons

### Calendar Management
- View all calendar events in a table
- Filter by event type (Maintenance, Deployment, etc.)
- Export events to CSV
- See priority levels and lifecycle buckets

### Contract Management  
- View active contracts
- See contract values and expiry dates
- Track renewal notice periods

### Lifecycle Management
- View product lifecycle catalog
- See lifecycle buckets (NEW, ACTIVE, MATURE, LEGACY, EOL)
- Track end-of-life dates

### Settings
- Edit application settings
- Configure notification preferences
- Manage integrations

## 🛠 Development Commands

```bash
# Start services
make up              # Start all services
make down            # Stop all services  
make restart         # Restart services

# Development
make api             # Start API only
make web             # Start frontend only
make build           # Build all packages
make clean           # Clean build artifacts

# Database
make seed            # Seed with sample data
make db-reset        # Reset database (WARNING: destroys data)
make db-studio       # Open Prisma Studio

# Quality
make lint            # Run linters
make typecheck       # TypeScript checking
make test            # Run tests
```

## 📋 API Features

### Authentication
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

### Calendar Events
```bash
# Get events
curl http://localhost:8080/api/calendar/events

# Filter by type  
curl "http://localhost:8080/api/calendar/events?eventType=MAINTENANCE"

# Export to CSV
curl "http://localhost:8080/api/calendar/export" -o events.csv
```

### Interactive API Documentation
Visit http://localhost:8080/api/docs for full Swagger UI

## 🏗 Architecture Overview

```
FleetOps Calendar/
├── apps/
│   ├── api/           # NestJS backend (Port 8080)
│   └── frontend/      # React frontend (Port 3000)  
├── packages/
│   └── shared/        # Shared types & utilities
├── infra/             # Docker services
└── docs/              # Documentation
```

## 🔐 Security & RBAC

### Roles
- **ADMIN:** Full access (read/write/delete all resources)
- **OPERATOR:** Read/write operational data 
- **VIEWER:** Read-only access

### Protected Endpoints
- Event creation/editing requires OPERATOR+ role
- User management requires ADMIN role
- Settings modification requires ADMIN role

## 🎨 Features Implemented

### ✅ Core Features
- Calendar event management with lifecycle tracking
- Contract management with renewal tracking
- Asset lifecycle management  
- Vulnerability tracking placeholders
- Settings management
- Role-based access control
- CSV export functionality

### ✅ Technical Features  
- JWT authentication
- OpenAPI documentation
- Database migrations with Prisma
- TypeScript throughout
- ESM module support
- Docker containerization
- CI/CD pipeline

### 🔮 Future Enhancements (Planned)
- FullCalendar timeline UI
- Real integrations (ServiceNow, Teams, Azure AD)
- Advanced AI insights and risk scoring
- ICS calendar export
- Email/webhook alert delivery
- Comprehensive E2E testing

## 🆘 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's using the ports
lsof -i :3000
lsof -i :8080
lsof -i :5432
```

**Database connection issues:**
```bash
# Reset the database
make db-reset
```

**Build issues:**
```bash
# Clean and rebuild
make clean
make install
make build
```

**Prisma client issues:**
```bash
# Regenerate Prisma client
pnpm --filter @fleetops/api run db:generate
```

### Getting Help
- Check the comprehensive README.md
- View API documentation at /api/docs
- Review ADR-0001 for architectural decisions
- Check GitHub Actions for CI status

## 🎉 Success!

You now have a fully functional FleetOps Calendar system with:
- Production-ready monorepo structure
- Complete authentication and authorization
- Interactive calendar and contract management
- Comprehensive API with documentation
- Ready for enterprise deployment

Happy fleet managing! 🚢