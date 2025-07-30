import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the storage path from environment variable or use a default path
const storagePath = process.env.DB_STORAGE || path.join(__dirname, '../../data/database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
  },
  // Only sync when not in test environment
  sync: { force: process.env.NODE_ENV === 'test' },
});

export default sequelize;
