"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = __importDefault(require("./config/database"));
const food_routes_1 = __importDefault(require("./routes/food.routes"));
const errors_1 = require("./utils/errors");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
        this.initializeDatabase();
    }
    // Singleton pattern to ensure only one instance exists
    static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        if (process.env.NODE_ENV === 'development') {
            this.app.use((0, morgan_1.default)('dev'));
        }
    }
    initializeRoutes() {
        // API Routes
        this.app.use('/api/v1/foods', food_routes_1.default);
        // Health check endpoint
        this.app.get('/health', (req, res) => {
            res.status(200).json({
                status: 'success',
                message: 'Server is running',
                timestamp: new Date().toISOString(),
            });
        });
        // Handle 404 - Not Found
        this.app.all('*', (req, res, next) => {
            next(new errors_1.NotFoundError(`Can't find ${req.originalUrl} on this server!`));
        });
    }
    initializeErrorHandling() {
        this.app.use(errors_1.errorHandler);
    }
    async initializeDatabase() {
        try {
            await database_1.default.authenticate();
            console.log('Database connection has been established successfully.');
            // Sync all models
            if (process.env.NODE_ENV !== 'test') {
                await database_1.default.sync({ force: false });
                console.log('Database synchronized');
            }
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    }
    getServer() {
        return this.app;
    }
    getHttpServer() {
        return this.server;
    }
    async close() {
        try {
            // Close the HTTP server
            if (this.server) {
                await new Promise((resolve, reject) => {
                    this.server.close((err) => {
                        if (err) {
                            console.error('Error closing HTTP server:', err);
                            return reject(err);
                        }
                        console.log('HTTP server closed');
                        resolve();
                    });
                });
            }
            // Close the database connection
            await database_1.default.close();
            console.log('Database connection closed');
        }
        catch (error) {
            console.error('Error during application shutdown:', error);
            throw error;
        }
    }
}
// Create and export a singleton instance of the App
const app = App.getInstance();
exports.default = app;
