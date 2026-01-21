# User and Staff Management API

This API provides CRUD operations for managing users and staff members with role-based access control.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory:
```
JWT_SECRET=your_jwt_secret_here
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=peminjaman_db
```

3. Run the application:
```bash
npm run start:dev
```

## Authentication

### Login
- POST `/auth/login`
- Request body:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```
- Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-string",
    "email": "admin@example.com",
    "username": "admin",
    "role": "admin"
  }
}
```

## API Endpoints

All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Users Management (Admin Only)

- GET `/users` - Get all users
- GET `/users/:id` - Get user by ID
- POST `/users` - Create a new user
- PUT `/users/:id` - Update a user
- DELETE `/users/:id` - Delete a user

### Staff Management (Admin Only)

- GET `/staff` - Get all staff members
- GET `/staff/:id` - Get staff member by ID
- POST `/staff` - Create a new staff member
- PUT `/staff/:id` - Update a staff member
- DELETE `/staff/:id` - Delete a staff member

## Default Admin Account

After seeding, a default admin account is created:
- Email: `admin@example.com`
- Password: `admin123`

## Seeding Admin User

To create the initial admin user, run:
```bash
npx ts-node src/seeds/seed-admin.ts
```