# Food Ordering - Frontend

A modern, responsive food ordering web application built with Next.js, React, and Tailwind CSS. This frontend application provides a seamless user experience for browsing menus, customizing orders, and processing payments.

## 🚀 Features

- **Modern UI/UX** with responsive design using Tailwind CSS
- **State Management** with Redux Toolkit for global state
- **Form Handling** with React Hook Form
- **Type Safety** with TypeScript
- **Component Library** with Headless UI and Hero Icons
- **Optimized Performance** with Next.js features
- **Testing** with Jest and React Testing Library

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: Redux Toolkit
- **UI Components**: Headless UI, Hero Icons, Lucide Icons
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Linting & Formatting**: ESLint, Prettier

## 📦 Prerequisites

- Node.js 18.0.0 or later
- npm (v9+) or yarn (v1.22+) or pnpm (v8+)
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/food-ordering-app.git
cd food-ordering-app/frontend
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

Create a `.env.local` file in the frontend directory and add the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# Add other environment variables as needed
```

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                  # App router pages and layouts
│   ├── components/           # Reusable UI components
│   ├── features/             # Feature-based modules
│   │   ├── cart/            # Shopping cart feature
│   │   ├── menu/            # Menu display feature
│   │   └── auth/            # Authentication feature
│   ├── lib/                 # Utility functions and configurations
│   ├── hooks/               # Custom React hooks
│   ├── store/               # Redux store configuration
│   ├── styles/              # Global styles and Tailwind config
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
└── tests/                   # Test files
```

## 🧪 Testing

Run the test suite:

```bash
npm test
# or
yarn test
# or
pnpm test
```

For test coverage:

```bash
npm run test:coverage
```

## 🧹 Linting and Formatting

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 🏗️ Build for Production

```bash
npm run build
```


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.
