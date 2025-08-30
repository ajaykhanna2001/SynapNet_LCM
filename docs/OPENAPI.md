# FleetOps Calendar API Documentation

## Overview

The FleetOps Calendar API is a RESTful service built with NestJS that provides comprehensive operational calendar management capabilities.

## Base URL

- **Development:** `http://localhost:8080/api`
- **Documentation:** `http://localhost:8080/api/docs`

## Authentication

The API uses JWT Bearer token authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Login Endpoint

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "email": "admin@example.com",
    "firstName": "Admin",
    "lastName": "User",
    "role": "ADMIN"
  }
}
```

## Core Endpoints

### Calendar Events

#### Get Events
```http
GET /api/calendar/events?eventType=MAINTENANCE&page=1&limit=20
```

**Query Parameters:**
- `eventType` (optional): Filter by event type
- `startDate` (optional): Filter events after this date
- `endDate` (optional): Filter events before this date  
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page

#### Create Event
```http
POST /api/calendar/events
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Server Maintenance",
  "description": "Scheduled maintenance window",
  "startDate": "2024-04-15T09:00:00Z",
  "endDate": "2024-04-15T17:00:00Z",
  "eventType": "MAINTENANCE",
  "priority": "HIGH",
  "assetId": "asset-id-optional"
}
```

#### Export Events to CSV
```http
GET /api/calendar/export?eventType=MAINTENANCE
```

### Contracts

#### Get Contracts
```http
GET /api/contracts?page=1&limit=20
```

#### Create Contract
```http
POST /api/contracts
Content-Type: application/json
Authorization: Bearer <token>

{
  "vendor": "TechCorp Solutions",
  "contractNumber": "TC-2024-001",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "value": 150000,
  "renewalNoticeMonths": 3
}
```

### Lifecycle Management

#### Get Catalog Entries
```http
GET /api/lifecycle/catalog?page=1&limit=20
```

#### Reconcile Lifecycle Buckets
```http
POST /api/lifecycle/reconcile
Authorization: Bearer <token>
```

### Assets

#### Get Assets
```http
GET /api/assets?page=1&limit=20
```

### Settings

#### Get Settings
```http
GET /api/settings
Authorization: Bearer <token>
```

## Data Models

### Event Types
- `MAINTENANCE` - Scheduled maintenance activities
- `DEPLOYMENT` - Software/hardware deployments
- `RETIREMENT` - Asset retirement activities
- `VULNERABILITY` - Security vulnerability remediation
- `CONTRACT_RENEWAL` - Contract renewal activities
- `COMPLIANCE` - Compliance-related activities
- `OTHER` - Other operational activities

### Priority Levels
- `LOW` - Low priority, can be scheduled flexibly
- `MEDIUM` - Normal priority, standard scheduling
- `HIGH` - High priority, limited scheduling flexibility
- `CRITICAL` - Critical priority, immediate attention required

### Lifecycle Buckets
- `NEW` - Recently released (< 1 year)
- `ACTIVE` - Actively supported (1-3 years) 
- `MATURE` - Mature but supported (3+ years)
- `LEGACY` - Approaching end of life
- `EOL` - End of life reached

### User Roles
- `ADMIN` - Full access to all features
- `OPERATOR` - Read/write access to operational data
- `VIEWER` - Read-only access

## Error Handling

The API returns standard HTTP status codes and structured error responses:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

Currently no rate limiting is implemented. Future versions may include rate limiting based on user role and endpoint.

## Pagination

List endpoints support pagination with the following parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

Response format:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

## Future Endpoints (Planned)

The following endpoints are planned for future releases:

### AI Insights
- `POST /api/ai/normalize` - Normalize vendor/product names
- `POST /api/ai/eol-extract` - Extract EOL dates from vendor data

### Advanced Vulnerability Management
- `POST /api/vulnerabilities/scan` - Trigger vulnerability scan
- `GET /api/vulnerabilities/findings` - Get vulnerability findings

### Alert Management
- `POST /api/alerts` - Create alert rules
- `PUT /api/alerts/:id` - Update alert rules
- `POST /api/alerts/test` - Test alert delivery

### Audit Logging
- `GET /api/audit/logs` - Retrieve audit logs

### Background Jobs
- `GET /api/jobs` - List background jobs
- `GET /api/jobs/:id` - Get job status

## Interactive Documentation

For detailed, interactive API documentation with request/response examples, visit:
`http://localhost:8080/api/docs`

This provides a Swagger UI interface where you can:
- Explore all available endpoints
- View detailed schemas
- Test API calls directly from the browser
- Download OpenAPI specification