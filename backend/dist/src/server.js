"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// Get the HTTP server instance from the app
const server = app_1.default.getHttpServer();
// Start the server
const startServer = async () => {
    try {
        // Start listening on the specified port
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
        });
    }
    catch (error) {
        console.error('Error starting server:', error);
        await app_1.default.close().catch(console.error);
        process.exit(1);
    }
};
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    // Close the server and exit the process
    server.close(async () => {
        await app_1.default.close().catch(console.error);
        process.exit(1);
    });
});
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    // Close the server and exit the process
    server.close(async () => {
        await app_1.default.close().catch(console.error);
        process.exit(1);
    });
});
// Handle SIGTERM signal
process.on('SIGTERM', async () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully...');
    try {
        // Close the server and database connections
        await app_1.default.close();
        console.log('Graceful shutdown complete');
        process.exit(0);
    }
    catch (error) {
        console.error('Error during graceful shutdown:', error);
        process.exit(1);
    }
});
// Handle Ctrl+C (SIGINT)
process.on('SIGINT', async () => {
    console.log('SIGINT RECEIVED. Shutting down gracefully...');
    try {
        // Close the server and database connections
        await app_1.default.close();
        console.log('Graceful shutdown complete');
        process.exit(0);
    }
    catch (error) {
        console.error('Error during graceful shutdown:', error);
        process.exit(1);
    }
});
// Initialize and start the server
startServer().catch(async (error) => {
    console.error('Failed to start server:', error);
    await app_1.default.close().catch(console.error);
    process.exit(1);
});
