# Food Ordering App

A modern, accessible, and responsive food ordering application built with Next.js, React, and TypeScript.

## Features

- 🍔 Browse food items by category
- 🔍 Search and filter functionality
- 🛒 Add items to cart with real-time updates
- 📱 Fully responsive design
- 🌓 Dark/light mode support
- ♿️ Accessible components
- 🚀 Optimized performance
- 🧪 Comprehensive test coverage

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **API**: Next.js API Routes
- **Testing**: Jest, React Testing Library
- **Linting/Formatting**: ESLint, Prettier
- **Deployment**: Vercel (frontend), Railway (backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/food-ordering-app.git
   cd food-ordering-app
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

### Running Locally

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run tests for the frontend:

```bash
cd frontend
npm test
```

Run tests for the backend:

```bash
cd backend
npm test
```

## Project Structure

```
frontend/
├── public/           # Static files
├── src/
│   ├── app/         # App router pages and layouts
│   ├── components/  # Reusable UI components
│   ├── context/     # React context providers
│   ├── hooks/       # Custom React hooks
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
