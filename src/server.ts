import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import { AppDataSource } from './config/database/data-source';
<<<<<<< Updated upstream
=======
import flightsRouter from './route/flight.route';
import cors from 'cors';
>>>>>>> Stashed changes

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000');

app.use(express.json());
<<<<<<< Updated upstream

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});
=======
app.use(cors());
app.use('/', flightsRouter);
>>>>>>> Stashed changes

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