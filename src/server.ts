import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './config/database/data-source';
import flightsRouter from './route/flight.route';
import cors from 'cors';

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000');

app.use(express.json());
app.use(cors());
app.use('/', flightsRouter);

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');
    
    console.log('Running pending migrations...');
    await AppDataSource.runMigrations();
    console.log('Migrations have been successfully run.');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err: Error) => {
    console.error('Error during Data Source initialization:', err);
  });