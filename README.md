# Food Ordering Application (Monorepo)

A modern, full-stack food ordering platform with a microservices architecture, built using a monorepo structure. This repository contains both the frontend and backend services, along with all necessary tooling and configurations.

## 🏗️ Monorepo Structure

```
food-ordering-app/
├── backend/          # Backend service (Node.js, Express, TypeScript)
├── frontend/         # Frontend application (Next.js, React, TypeScript)
└── README.md         # You are here
```

## 🚀 Features

### Frontend
- 🍔 Modern, responsive UI with Next.js and React
- 🎨 Styled with Tailwind CSS for rapid UI development
- 🔄 State management with Redux Toolkit
- 📱 Mobile-first, responsive design
- 🧪 Comprehensive test coverage with Jest and React Testing Library

### Backend
- 🛠️ RESTful API built with Express and TypeScript
- 🔒 Authentication & Authorization with JWT
- 🗃️ Database management with Sequelize and TypeORM
- 📝 Input validation with express-validator
- 📊 Logging with Morgan

## 🏗️ Monorepo Benefits

1. **Unified Versioning**
   - Single source of truth for all dependencies
   - Atomic commits across frontend and backend
   - Simplified dependency management

2. **Streamlined Development**
   - Single command to install all dependencies
   - Shared tooling and configurations
   - Consistent coding standards across the project

3. **Simplified CI/CD**
   - Single pipeline for building, testing, and deploying all services
   - Coordinated deployments between frontend and backend
   - Simplified dependency management

4. **Code Reusability**
   - Shared TypeScript types between frontend and backend
   - Common utilities and helpers
   - Consistent error handling patterns

## 🛠️ Prerequisites

- Node.js 18+ and npm 9+ or yarn/pnpm
- Git
- PostgreSQL (for production backend)
- SQLite (for development backend)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/food-ordering-app.git
cd food-ordering-app
```

### 2. Install dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Set up environment variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=food_ordering
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the development servers

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

### Run all tests
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd ../backend && npm test
```

### Test coverage
```bash
# Frontend coverage
cd frontend && npm run test:coverage

# Backend coverage
cd ../backend && npm run test:coverage
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push your code to a GitHub/GitLab repository
2. Import the frontend project on Vercel
3. Set up environment variables in the Vercel dashboard
4. Deploy!

### Backend (Railway/Heroku/AWS)
1. Set up a PostgreSQL database
2. Configure environment variables
3. Deploy using your preferred platform

### Monorepo Deployment Strategy
1. **Frontend**: Deployed to Vercel with automatic preview deployments for each PR
2. **Backend**: Deployed to Railway with automatic deployments from the main branch
3. **Database**: Managed PostgreSQL instance (e.g., Supabase, Railway Postgres, or AWS RDS)
4. **CI/CD**: GitHub Actions for running tests and deployment workflows

## 📂 Project Structure

```
frontend/               # Next.js frontend application
├── public/            # Static files
├── src/               # Source code
│   ├── app/          # App router pages and layouts
│   ├── components/    # Reusable UI components
│   ├── features/      # Feature-based modules
│   ├── lib/          # Utility functions
│   └── store/        # Redux store configuration

backend/               # Node.js backend service
├── src/              # Source code
│   ├── config/       # Configuration files
│   ├── controllers/  # Request handlers
│   ├── middleware/   # Express middleware
│   ├── models/       # Database models
│   ├── routes/       # API route definitions
│   └── services/     # Business logic

.github/              # GitHub workflows and templates
└── .vscode/          # VSCode settings (if any)
```
│   ├── lib/         # Utility functions
│   ├── styles/      # Global styles
│   └── types/       # TypeScript type definitions
│
backend/
├── src/
│   ├── config/      # Configuration files
│   ├── controllers/ # Route controllers
│   ├── middleware/  # Express middleware
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── services/    # Business logic
│   └── utils/       # Utility functions
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/learn)
- [Shadcn UI](https://ui.shadcn.com/) for component inspiration
