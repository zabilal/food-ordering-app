# Food Ordering - Backend

A robust and scalable backend service for the Food Ordering application, built with Node.js, Express, and TypeScript. This backend provides a RESTful API for managing menus, orders, users, and authentication.

## 🚀 Features

- **RESTful API** with Express.js
- **TypeScript** for type safety and better developer experience
- **Database ORM** with Sequelize and TypeORM
- **Authentication & Authorization** with JWT
- **Input Validation** with express-validator
- **Logging** with Morgan
- **Environment Configuration** with dotenv
- **Testing** with Jest
- **Database Migrations** for schema management
- **API Documentation** with Swagger/OpenAPI (if implemented)

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQLite (file-based)
- **ORM**: Sequelize with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Logging**: Morgan
- **Testing**: Jest, Supertest
- **Linting & Formatting**: ESLint, Prettier

## 📦 Prerequisites

- Node.js 18.0.0 or later
- npm (v9+) or yarn (v1.22+) or pnpm (v8+)
- PostgreSQL 13+ (for production)
- SQLite3 (for development)
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/food-ordering-app.git
cd food-ordering-app/backend
```

### 2. Install dependencies

```bash
npm install
# or
yarn
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the backend directory based on `.env.example`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# SQLite Database Configuration
DB_STORAGE=./data/database.sqlite
DB_LOGGING=false

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Logging
LOG_LEVEL=debug
```

### 4. Set up the database

#### Database Configuration
This project uses SQLite as its database, which is stored in a file at `./data/database.sqlite` by default. The database file will be created automatically when you first run the application.

To customize the database location, update the `DB_STORAGE` path in your `.env` file.

### 5. Run database migrations

```bash
# Run migrations
npm run migrate

# Revert last migration if needed
npm run migrate:revert
```

### 6. Start the development server

```bash
# Development mode with hot-reload
npm run dev

# Production build and start
npm run build
npm start
```

The API will be available at `http://localhost:5000` by default.

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── migrations/       # Database migrations
│   ├── models/           # Database models
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── validators/       # Request validation schemas
│   ├── app.ts            # Express application setup
│   └── server.ts         # Server entry point
├── tests/               # Test files
├── scripts/             # Utility scripts
└── dist/                # Compiled JavaScript (production)
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## 🧹 Linting and Formatting

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code (if Prettier is configured)
npm run format
```

## 🔄 Database Migrations

### Create a new migration

```bash
# Create a new migration file
npm run migration:generate -- -n MigrationName

# Run pending migrations
npm run migrate

# Revert the last migration
npm run migrate:revert
```

## 🌐 API Documentation

API documentation is available via Swagger UI when running in development mode:
- Swagger UI: `http://localhost:5000/api-docs`
- OpenAPI JSON: `http://localhost:5000/api-docs.json`

## 🚀 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Environment Variables for Production

For production, ensure you have these environment variables set:

```env
NODE_ENV=production
PORT=80
DB_STORAGE=/path/to/production/db.sqlite
JWT_SECRET=your_secure_jwt_secret
```

### Production Considerations

1. **Database Location**: Ensure the `DB_STORAGE` path points to a persistent volume in production
2. **Backups**: Set up regular backups of the SQLite database file
3. **File Permissions**: Ensure the application has write permissions to the database file location

### Using PM2 (recommended for production)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application with PM2
pm2 start dist/server.js --name "food-ordering-backend"

# Save the PM2 process list
pm2 save

# Set up PM2 to start on system boot
pm2 startup
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## 🔧 Troubleshooting

- **Database connection issues**: Verify your database credentials in `.env` and ensure the database server is running.
- **Migration errors**: Make sure all previous migrations have been applied successfully.
- **Type errors**: Run `npm run build` to check for TypeScript compilation errors.
- **Port in use**: Change the `PORT` in `.env` if the default port is already in use.
