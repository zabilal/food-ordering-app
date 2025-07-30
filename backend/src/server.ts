import app from './app';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

// Get the HTTP server instance from the app
const server = app.getHttpServer();

// Start the server
const startServer = async () => {
  try {
    // Start listening on the specified port
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    await app.close().catch(console.error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  
  // Close the server and exit the process
  server.close(async () => {
    await app.close().catch(console.error);
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  
  // Close the server and exit the process
  server.close(async () => {
    await app.close().catch(console.error);
    process.exit(1);
  });
});

// Handle SIGTERM signal
process.on('SIGTERM', async () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully...');
  
  try {
    // Close the server and database connections
    await app.close();
    console.log('Graceful shutdown complete');
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
});

// Handle Ctrl+C (SIGINT)
process.on('SIGINT', async () => {
  console.log('SIGINT RECEIVED. Shutting down gracefully...');
  
  try {
    // Close the server and database connections
    await app.close();
    console.log('Graceful shutdown complete');
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
});

// Initialize and start the server
startServer().catch(async (error) => {
  console.error('Failed to start server:', error);
  await app.close().catch(console.error);
  process.exit(1);
});
