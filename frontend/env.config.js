// Frontend environment configuration
// This file should be committed to version control
// Sensitive values should be provided via environment variables

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  // API Configuration
  api: {
    // Base URL for API requests
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    
    // Default request timeout in milliseconds
    timeout: 30000,
    
    // Default headers for all requests
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    
    // Endpoints
    endpoints: {
      foods: '/foods',
      foodById: (id) => `/foods/${id}`,
      categories: '/categories',
      searchFoods: (query) => `/foods/search?q=${encodeURIComponent(query)}`,
      foodsByCategory: (categoryId) => `/foods/category/${encodeURIComponent(categoryId)}`,
      orders: '/orders',
    },
  },
  
  // Feature flags
  features: {
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableMockApi: process.env.NEXT_PUBLIC_ENABLE_MOCK_API === 'true',
  },
  
  // Application settings
  app: {
    name: 'Food Ordering App',
    description: 'Order delicious food online',
    defaultCurrency: 'USD',
    defaultLanguage: 'en',
    itemsPerPage: 12,
  },
  
  // Development settings
  dev: {
    logApiCalls: !isProduction,
    logStateChanges: !isProduction,
  },
};

export default config;
