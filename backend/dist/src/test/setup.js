"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopTestServer = exports.startTestServer = exports.server = void 0;
const app_1 = __importDefault(require("../app"));
const database_1 = __importDefault(require("../config/database"));
const globals_1 = require("@jest/globals");
const startTestServer = async () => {
    await database_1.default.sync({ force: true });
    return new Promise((resolve) => {
        const expressApp = app_1.default.getServer();
        exports.server = expressApp.listen(0, () => {
            const address = exports.server.address();
            resolve(address.port);
        });
    });
};
exports.startTestServer = startTestServer;
const stopTestServer = async () => {
    if (exports.server) {
        await new Promise((resolve, reject) => {
            exports.server.close((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    await database_1.default.close();
};
exports.stopTestServer = stopTestServer;
// Global test setup and teardown
(0, globals_1.beforeAll)(async () => {
    // Set test environment variables
    process.env.NODE_ENV = 'test';
    process.env.PORT = '0'; // Let the OS assign a random port
    // Start the test server
    await (0, exports.startTestServer)();
});
(0, globals_1.afterAll)(async () => {
    // Stop the test server and close database connections
    await (0, exports.stopTestServer)();
});
(0, globals_1.afterEach)(async () => {
    // Clear the database between tests
    await database_1.default.sync({ force: true });
});
