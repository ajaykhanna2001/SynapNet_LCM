# ADR-0001: Monorepo Structure

## Status
Accepted

## Context
FleetOps Calendar requires a cohesive development experience across multiple related packages:
- Backend API (NestJS)
- Frontend application (React)
- Shared types and utilities
- Infrastructure configuration

## Decision
We will use a monorepo structure with PNPM workspaces to manage all related packages in a single repository.

### Structure
```
FleetOps Calendar/
├── apps/
│   ├── api/                    # NestJS backend
│   └── frontend/               # React frontend
├── packages/
│   └── shared/                 # Shared types/constants/utils
├── infra/                      # Docker, seeds, deployment config
├── docs/                       # Documentation and ADRs
└── .github/workflows/          # CI/CD pipelines
```

### Technology Choices

#### Backend (apps/api)
- **Framework:** NestJS - Enterprise-grade Node.js framework with built-in support for TypeScript, dependency injection, and modular architecture
- **Database:** PostgreSQL 15 - Robust relational database with excellent JSON support
- **ORM:** Prisma - Type-safe database access with excellent TypeScript integration
- **Authentication:** JWT with Passport.js
- **Documentation:** OpenAPI/Swagger for automatic API documentation
- **Scheduling:** node-cron for background jobs
- **Validation:** class-validator for request validation

#### Frontend (apps/frontend)
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite - Fast development and build tool
- **State Management:** React Query for server state management
- **Routing:** React Router v6
- **HTTP Client:** Axios with request/response interceptors
- **Styling:** Inline styles (for simplicity in this version)

#### Shared (packages/shared)
- **Types:** Comprehensive TypeScript interfaces shared across frontend and backend
- **Constants:** RBAC definitions, color mappings, API endpoints
- **Utilities:** Lifecycle bucket calculation, date formatting, risk scoring

#### Infrastructure
- **Containerization:** Docker with multi-stage builds
- **Orchestration:** Docker Compose for local development
- **Database:** PostgreSQL 15 in container
- **Reverse Proxy:** Not included (future enhancement)

## Consequences

### Positive
- **Unified Development:** Single repository for all related code
- **Type Safety:** Shared types ensure consistency across frontend/backend
- **Dependency Management:** PNPM workspaces handle inter-package dependencies efficiently
- **Developer Experience:** Simplified setup and development workflow
- **CI/CD:** Single pipeline can build, test, and deploy all components

### Negative
- **Complexity:** More complex than separate repositories for simple projects
- **Build Times:** Larger repository may have longer clone/build times
- **Tool Requirements:** Requires PNPM and understanding of workspace concepts

### Mitigation Strategies
- Clear documentation and setup scripts (Makefile)
- Modular builds that only build changed packages
- Proper .gitignore to exclude build artifacts
- Comprehensive README with quick start guide

## Implementation Notes

### Package Manager
PNPM was chosen over npm/yarn for:
- Superior monorepo support with workspaces
- Efficient disk usage with content-addressable storage
- Better dependency resolution and security
- Native support for workspace protocols

### Build Strategy
- Each package has its own build script
- Shared package builds to dist/ for consumption
- Docker builds use multi-stage approach for optimization
- Development mode uses watch/hot-reload where possible

### Dependency Management
- Shared dependencies are hoisted to root when possible
- Package-specific dependencies remain local
- Workspace protocol links for internal dependencies
- Lock file ensures reproducible builds

## Future Considerations

### Scaling
- May need to split into multiple repositories if team grows significantly
- Consider tools like Lerna or Nx for more advanced monorepo management
- Implement incremental builds as codebase grows

### Deployment
- Current Docker Compose is suitable for development and small deployments
- Production may benefit from Kubernetes manifests
- Consider Helm charts for complex deployments

### Testing
- Jest configured per package with shared configuration
- Integration tests should span multiple packages
- E2E tests will require coordination between frontend and backend

This ADR establishes the foundation for a maintainable, scalable monorepo structure that supports rapid development while maintaining type safety and code quality across the entire FleetOps Calendar application stack.