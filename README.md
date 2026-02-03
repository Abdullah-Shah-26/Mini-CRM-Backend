# Mini CRM Backend

A production-quality REST API built with Node.js, Express, PostgreSQL, and Prisma featuring JWT authentication, role-based authorization, and comprehensive API documentation.

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator, class-transformer
- **API Documentation**: Swagger (swagger-jsdoc, swagger-ui-express)
- **Password Security**: bcrypt

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Abdullah-Shah-26/Mini-CRM-Backend.git
cd Mini-CRM-Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
cp .env.example .env
```

Edit `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/mini_crm"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
NODE_ENV="development"
```

4. **Setup database**

```bash
# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

## Running the Server

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm start
```

Server will start on `http://localhost:3000`

## API Documentation

Once the server is running, access the interactive Swagger documentation at:

**http://localhost:3000/api-docs**

## API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Users (Admin Only)

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user role

### Customers

- `POST /customers` - Create customer (Admin only)
- `GET /customers` - Get all customers with pagination
- `GET /customers/:id` - Get customer by ID
- `PATCH /customers/:id` - Update customer (Admin only)
- `DELETE /customers/:id` - Delete customer (Admin only)

### Tasks

- `POST /tasks` - Create task (Admin only)
- `GET /tasks` - Get tasks (role-based filtering)
- `PATCH /tasks/:id/status` - Update task status

## Testing with Postman

### 1. Register an Admin User

```bash
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

### 2. Login

```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Copy the `accessToken` from the response.

### 3. Use Protected Endpoints

Add the token to the Authorization header:

```
Authorization: Bearer <your-access-token>
```

### Example: Create a Customer

```bash
POST http://localhost:3000/customers
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "+1234567890",
  "company": "Acme Corporation"
}
```

## Project Structure

```
src/
├── config/          # Configuration files (database, swagger)
├── middleware/      # Express middleware (auth, validation, error handling)
├── modules/         # Feature modules
│   ├── auth/        # Authentication (register, login)
│   ├── users/       # User management
│   ├── customers/   # Customer CRUD
│   └── tasks/       # Task management
├── types/           # TypeScript type definitions
├── utils/           # Utility functions (JWT, password hashing, errors)
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## Authentication & Authorization

### Roles

- **ADMIN**: Full access to all endpoints
- **EMPLOYEE**: Read-only access to customers, can view/update only assigned tasks

### Protected Routes

All routes except `/auth/register` and `/auth/login` require JWT authentication.

Add the JWT token to requests:

```
Authorization: Bearer <token>
```

## Database Schema

### User

- id, name, email (unique), password (hashed), role, createdAt, updatedAt

### Customer

- id, name, email (unique), phone (unique), company, createdAt, updatedAt

### Task

- id, title, description, status, assignedTo (userId), customerId, createdAt, updatedAt

## Features

- JWT-based authentication
- Role-based authorization (ADMIN, EMPLOYEE)
- Password hashing with bcrypt
- Input validation with DTOs
- Pagination for customer list
- Customer search filter
- Comprehensive error handling
- Swagger API documentation
- Clean architecture (controllers, services, DTOs)
- TypeScript for type safety

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "statusCode": 400,
  "details": ["Validation error details"]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate email/phone)
- `500` - Internal Server Error

## Environment Variables

| Variable       | Description                  | Example                                          |
| -------------- | ---------------------------- | ------------------------------------------------ |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/mini_crm` |
| `JWT_SECRET`   | Secret key for JWT signing   | `your-secret-key`                                |
| `PORT`         | Server port                  | `3000`                                           |
| `NODE_ENV`     | Environment mode             | `development` or `production`                    |

## Contributing

This is a backend project showcasing Node.js, Express, PostgreSQL, and Prisma implementation with JWT authentication and role-based authorization.

## Contact

**Author**: Abdullah Shah  
**GitHub**: https://github.com/Abdullah-Shah-26/Mini-CRM-Backend