import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './config/database/data-source';

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000');

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err: Error) => {
    console.error('Error during Data Source initialization:', err);
  });