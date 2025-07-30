"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
    },
});
exports.default = sequelize;
