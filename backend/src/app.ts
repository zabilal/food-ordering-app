import express, { Application, Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import sequelize from './config/database';
import foodRoutes from './routes/food.routes';
import { errorHandler, NotFoundError } from './utils/errors';

declare global {
  // eslint-disable-next-line no-var
  var __APP_INSTANCE: App | undefined;
}

class App {
  public app: Application;
  public server: http.Server;
  private static instance: App;

  private constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeDatabase();
  }

  // Singleton pattern to ensure only one instance exists
  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  private initializeRoutes(): void {
    // API Routes
    this.app.use('/api/v1/foods', foodRoutes);

    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
      });
    });

    // Handle 404 - Not Found
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      
      // Sync all models
      if (process.env.NODE_ENV !== 'test') {
        await sequelize.sync({ force: false });
        console.log('Database synchronized');
      }
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);
    }
  }

  public getServer(): Application {
    return this.app;
  }

  public getHttpServer(): http.Server {
    return this.server;
  }

  public async close(): Promise<void> {
    try {
      // Close the HTTP server
      if (this.server) {
        await new Promise<void>((resolve, reject) => {
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
      await sequelize.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error during application shutdown:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance of the App
const app = App.getInstance();
export default app;
