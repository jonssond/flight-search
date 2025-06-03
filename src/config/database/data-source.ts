import { DataSource } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST, 
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, 
  synchronize: false,
  logging: false, 
  entities: [path.join(__dirname, '../../entity/**/*.{ts,js}')], 
  migrations: [path.join(__dirname, 'migrations/**/*.{ts,js}')], 
  subscribers: [path.join(__dirname, './subscribers/**/*.{ts,js}')], 
});