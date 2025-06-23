# Movie Booking System - Backend API

A NestJS-based REST API for a movie booking system with user authentication, authorization, and email verification.

## Features

- 🔐 **Authentication & Authorization**: JWT-based authentication with role-based access control
- 👥 **User Management**: Complete CRUD operations for users
- 📧 **Email Verification**: Account activation via email with code verification
- 🛡️ **Security**: Password hashing, rate limiting, CORS protection
- 📝 **Logging**: Winston-based logging system
- 🗄️ **Database**: PostgreSQL with Prisma ORM
- ✉️ **Email Service**: Nodemailer with Handlebars templates

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Gmail account for email service

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd server-movie-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/movie_booking?schema=public"
   
   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-here-change-in-production"
   
   # Email Configuration
   EMAIL="your-email@gmail.com"
   PASSWORD="your-app-password"
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Logging
   LOG_LEVEL=info
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed database
   npx prisma db seed
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/check-code` - Verify activation code
- `POST /api/auth/retry-active` - Resend activation code
- `GET /api/auth/profile` - Get user profile (protected)

### Users (Protected)
- `GET /api/users` - Get all users (with pagination and filtering)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Authentication Flow

1. **Registration**: User registers with email and password
2. **Email Verification**: System sends activation code via email
3. **Account Activation**: User enters activation code to activate account
4. **Login**: User logs in with email and password
5. **JWT Token**: System returns JWT token for subsequent requests

## Request/Response Format

All API responses follow this format:
```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": {
    // Response data
  }
}
```

## Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

- **Password Hashing**: BCrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Rate Limiting**: Throttling to prevent abuse
- **CORS Protection**: Configurable cross-origin requests
- **Input Validation**: Class-validator for request validation
- **Helmet**: Security headers

## Database Schema

### User Model
```prisma
model User {
  id          Int       @id @default(autoincrement())
  name        String
  english_name String?
  email       String    @unique
  phone       String?
  address     String?
  password    String
  is_active   Boolean   @default(false)
  active_code String?
  expired_code DateTime?
  latest_login DateTime?
  login_type   String? @default("LOCAL")
  avatar_url   String?
  role         String @default("customer")
  point        Int       @default(0)
  created_at   DateTime  @default(now())
  updated_at   DateTime  @updatedAt @default(now())
}
```

## Development

### Available Scripts
- `npm run dev` - Start in development mode with watch
- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Project Structure
```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data transfer objects
│   ├── passport/        # Passport strategies and guards
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── modules/
│   └── users/           # Users module
│       ├── dto/         # User DTOs
│       ├── entities/    # User entities
│       ├── users.controller.ts
│       ├── users.service.ts
│       └── users.module.ts
├── core/                # Core utilities
├── decorator/           # Custom decorators
├── helpers/             # Helper functions
├── logger/              # Logging configuration
├── mail/                # Email templates
├── prisma/              # Database service
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

<p align="center">
  Made with ❤️ by Hari
</p>
