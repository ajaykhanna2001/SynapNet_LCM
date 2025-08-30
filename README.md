# FleetOps Calendar

Enterprise Operational Calendar Tool - A comprehensive solution for managing fleet operations, contracts, assets, and lifecycle events.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Docker & Docker Compose

### Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd SynapNet_LCM
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

4. **Access the application:**
   - 🌐 **Frontend:** http://localhost:3000
   - 📋 **API:** http://localhost:8080/api
   - 📚 **API Documentation:** http://localhost:8080/api/docs

### Demo Accounts

- **Admin:** admin@example.com / password
- **Viewer:** viewer@example.com / password

## 📁 Project Structure

```
FleetOps Calendar/
├── apps/
│   ├── api/                    # NestJS backend API
│   │   ├── src/
│   │   │   ├── auth/           # Authentication module
│   │   │   ├── calendar/       # Calendar events management
│   │   │   ├── contracts/      # Contract management
│   │   │   ├── lifecycle/      # Lifecycle management
│   │   │   ├── assets/         # Asset management
│   │   │   ├── vulnerabilities/ # Security vulnerability tracking
│   │   │   ├── alerts/         # Alert and notification system
│   │   │   ├── settings/       # Application settings
│   │   │   ├── ai/             # AI insights and automation
│   │   │   ├── audit/          # Audit logging
│   │   │   └── jobs/           # Background job processing
│   │   └── prisma/             # Database schema and migrations
│   └── frontend/               # React frontend application
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   ├── pages/          # Application pages/routes
│       │   ├── services/       # API service layer
│       │   └── hooks/          # Custom React hooks
├── packages/
│   └── shared/                 # Shared types, constants, and utilities
├── infra/                      # Infrastructure and deployment
│   └── docker-compose.yml      # Docker services configuration
├── docs/                       # Documentation
└── .github/workflows/          # CI/CD pipelines
```

## 🛠 Available Commands

Run `make help` to see all available commands:

- `make up` - Start all services with Docker Compose
- `make down` - Stop all services
- `make seed` - Seed database with sample data
- `make api` - Start API in development mode
- `make web` - Start frontend in development mode
- `make test` - Run all tests
- `make lint` - Run linters
- `make build` - Build all packages

## 🎯 Features

### Core Functionality
- **Calendar Management:** Schedule and track operational events
- **Contract Management:** Monitor contract lifecycles and renewals
- **Asset Management:** Track asset lifecycle and maintenance
- **Vulnerability Management:** Security vulnerability tracking and remediation
- **Alert System:** Automated notifications and scheduling
- **RBAC:** Role-based access control (Admin, Operator, Viewer)

### Technical Features
- **Monorepo Architecture:** PNPM workspaces with shared packages
- **Type Safety:** Full TypeScript implementation across stack
- **API Documentation:** OpenAPI/Swagger integration
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT-based authentication
- **Export Capabilities:** CSV export for calendar events
- **AI Preview:** Placeholder endpoints for future AI integration

## 🔧 Development

### Prerequisites for Development
- Node.js 18+
- pnpm 8+
- PostgreSQL 15+ (or use Docker)

### Local Development Setup

1. **Install dependencies:**
   ```bash
   make install
   ```

2. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Start PostgreSQL** (if not using Docker):
   ```bash
   # Using Docker
   make up

   # Or start your local PostgreSQL instance
   ```

4. **Run database migrations and seed:**
   ```bash
   make seed
   ```

5. **Start development servers:**
   ```bash
   # Terminal 1: API
   make api

   # Terminal 2: Frontend
   make web
   ```

### Testing

```bash
# Run all tests
make test

# Run linting
make lint

# Type checking
make typecheck
```

## 📋 API Documentation

The API documentation is automatically generated and available at:
- **Development:** http://localhost:8080/api/docs
- **Swagger JSON:** http://localhost:8080/api/docs-json

### Key API Endpoints

- `POST /api/auth/login` - User authentication
- `GET /api/calendar/events` - Retrieve calendar events
- `GET /api/calendar/export` - Export events to CSV
- `GET /api/contracts` - List contracts
- `GET /api/lifecycle/catalog` - Lifecycle catalog entries
- `GET /api/assets` - Asset management
- `GET /api/settings` - Application settings

## 🚢 Deployment

### Docker Deployment

```bash
# Production deployment
docker-compose -f infra/docker-compose.yml up -d
```

### Environment Variables

Key environment variables (see `.env.example`):

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `API_PORT` - API server port (default: 8080)
- `WEB_PORT` - Frontend port (default: 3000)

## 🎛 Configuration

### RBAC (Role-Based Access Control)

- **Admin:** Full access to all features
- **Operator:** Read/write access to operational data
- **Viewer:** Read-only access

### Lifecycle Buckets

Assets and products are automatically categorized into lifecycle buckets:
- **NEW:** Recently released (< 1 year)
- **ACTIVE:** Actively supported (1-3 years)
- **MATURE:** Mature but supported (3+ years)
- **LEGACY:** Approaching end of life
- **EOL:** End of life reached

## 🔮 Future Enhancements

The following features are planned for future releases:

- **Enhanced Calendar UI:** FullCalendar integration with timeline view
- **Real Integrations:** ServiceNow, Microsoft Teams, Azure AD
- **Advanced AI:** Risk scoring, predictive analytics
- **ICS Export:** Calendar integration
- **Comprehensive Testing:** E2E tests with Playwright
- **Advanced Alerts:** Email, Teams, webhook providers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

[License information here]

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api/docs`
- Review the architecture decision records in `/docs/`