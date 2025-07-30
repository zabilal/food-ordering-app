import { Server } from 'http';
import { AddressInfo } from 'net';
import app from '../app';
import sequelize from '../config/database';
import { beforeAll, afterAll, afterEach } from '@jest/globals';

export let server: Server;

export const startTestServer = async (): Promise<number> => {
  await sequelize.sync({ force: true });
  
  return new Promise((resolve) => {
    const expressApp = app.getServer();
    server = expressApp.listen(0, () => {
      const address = server.address() as AddressInfo;
      resolve(address.port);
    });
  });
};

export const stopTestServer = async (): Promise<void> => {
  if (server) {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  await sequelize.close();
};

// Global test setup and teardown
beforeAll(async () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.PORT = '0'; // Let the OS assign a random port
  
  // Start the test server
  await startTestServer();
});

afterAll(async () => {
  // Stop the test server and close database connections
  await stopTestServer();
});

afterEach(async () => {
  // Clear the database between tests
  await sequelize.sync({ force: true });
});
